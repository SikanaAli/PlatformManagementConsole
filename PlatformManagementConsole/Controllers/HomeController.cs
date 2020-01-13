using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using PlatformManagementConsole.Models;
using MQTTnet;
using MQTTnet.Client;
using MQTTnet.Client.Options;
using MQTTnet.Client.Receiving;
using MQTTnet.AspNetCore;
using System.Text;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using PlatformManagementConsole.Hubs;
using Microsoft.AspNetCore.SignalR;
using PlatformManagementConsole.Contexts;
using PlatformManagementConsole.Hubs;

namespace PlatformManagementConsole.Controllers
{
    public class HomeController : Controller
    {
      
        public MQTTnet.Client.IMqttClient mqttClient = new MqttFactory().CreateMqttClient();

        public string MQTT_IP = "test.mosquitto.org";
        public int MQTT_Port = 8080;
        public float MQTT_KeepAlive = 10.0f;
        public string RESOLVER_INIT = "cmsb/resolver/init";


        private readonly IHubContext<PmcHub> _hubContext;

        public HomeController(IHubContext<PmcHub> hubContext)
        {
            _hubContext = hubContext;
        }

        public IActionResult Index()
        {
            
            return View();
        }

        
        public async Task<IActionResult> Mqtt()
        {


            if (mqttClient.IsConnected == false)
            {
                await MakeMqttConnection();
                return Content("Mqtt Connection Requested "+mqttClient.IsConnected.ToString(),"text/html");
            }
            else
            {
                return Content("Mqtt Already Connected","text/html");
            }
        }

        [Route("Home/Publish")]
        public async Task<IActionResult> Publish(string id,string msg)
        {
            Console.WriteLine("ID => {0} MSG => {1}", id, msg);
            string topic = "cmsb/resolver/"+id;
            var message = new MqttApplicationMessageBuilder()
            .WithTopic(topic)
            .WithPayload(msg)
            .WithExactlyOnceQoS()
            .WithRetainFlag()
            .Build();
            await mqttClient.PublishAsync(message);
            return Content("Published", "text/html");
        }

      

        public async Task MakeMqttConnection()
        {
           
            var mqttClientOptions = new MqttClientOptionsBuilder()
                           .WithClientId("PMC_CLIENT")
                           .WithWebSocketServer(MQTT_IP + ":" + MQTT_Port.ToString())
                           .WithCleanSession()
                           .WithKeepAliveSendInterval(System.TimeSpan.FromSeconds(MQTT_KeepAlive))
                           .Build();
            mqttClient = new MqttFactory().CreateMqttClient();



            mqttClient.UseApplicationMessageReceivedHandler(async e =>
            {
                

                string topic = e.ApplicationMessage.Topic;

                switch (topic)
                {
                    case "cmsb/resolver/init":
                            string payload = Encoding.UTF8.GetString(e.ApplicationMessage.Payload);
                            await AddResolver(payload);
                        break;
                    case "cmsb/resolver/status":
                        break;

                    default:
                            await _hubContext.Clients.All.SendAsync("Undefined", e.ApplicationMessage);
                        break;
                }

                

                
                
            });


            mqttClient.UseConnectedHandler(async e =>
            {
                string result = "Connected to MQTT broker with result code {0}" + e.AuthenticateResult.ResultCode;

                await mqttClient.SubscribeAsync("cmsb/#");
                await _hubContext.Clients.All.SendAsync("MqttConnected", result);
            });

            

            mqttClient.UseDisconnectedHandler(async e => 
            {
                await _hubContext.Clients.All.SendAsync("MqttDisconnected","Mqtt Reconnecting");

                mqttClient.Dispose();
                await mqttClient.ConnectAsync(mqttClientOptions);

            });

            await mqttClient.ConnectAsync(mqttClientOptions);
            
        }


        private async Task AddResolver(string payload)
        {
            var data = JObject.Parse(payload);

            using (var db = new PmcDbContext())
            {
                if (db.Resolvers.Count((item)=>item.Guid == data.GetValue("Guid").ToString()) ==0)
                {
                    db.Resolvers.Add(new Resolver
                    {
                        Guid = data.GetValue("Guid").ToString(),
                        Name = data.GetValue("Name").ToString(),
                        DeviceType = data.GetValue("DeviceType").ToString(),
                        Platform = data.GetValue("Platform").ToString(),
                        OsVersion = data.GetValue("OsVersion").ToString(),
                        OEM = data.GetValue("OEM").ToString(),
                        Model = data.GetValue("Model").ToString(),
                        IsOnline = (bool)data.GetValue("IsOnline")
                    });

                    db.SaveChanges();



                    var dbList = db.Resolvers.ToList();
                    List<PmcHub.clientResolver> clientResolvers = new List<PmcHub.clientResolver>();

                    foreach (var item in dbList)
                    {
                        clientResolvers.Add(new PmcHub.clientResolver
                        {
                            Id = item.Guid,
                            Text = item.Name,
                            DeviceType = item.DeviceType,
                            Platform = item.Platform,
                            OsVersion = item.OsVersion,
                            OEM = item.OEM,
                            Model = item.Model,
                            IsOnline = item.IsOnline

                        });
                    }
                    

                    

                    await _hubContext.Clients.All.SendAsync("RefreshResolver", clientResolvers);
                }
                
            }


        }


        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
