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

        public async Task<IActionResult> Index()
        {
            await MakeMqttConnection();

            return View();
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
                JObject data = new JObject();

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

                if(e.ApplicationMessage.Topic.ToString() == "cmsb/init")
                {
                    
                    await AddResolver(Encoding.UTF8.GetString(e.ApplicationMessage.Payload));
                }
                else
                {
                    await _hubContext.Clients.All.SendAsync("MqttData", e);
                }

                data.Add("topic", e.ApplicationMessage.Topic.ToString());
                data.Add("msg", Encoding.UTF8.GetString(e.ApplicationMessage.Payload));

                var dataToSend = data.ToString();
                Console.WriteLine(dataToSend);
                await _hubContext.Clients.All.SendAsync("MqttData", data.GetValue("msg"));
            });


            mqttClient.UseConnectedHandler(async e =>
            {
                string result = "Connected to MQTT broker with result code {0}" + e.AuthenticateResult.ResultCode;

                await mqttClient.SubscribeAsync("cmsb/#");
                await _hubContext.Clients.All.SendAsync("MqttData", result);
            });

            mqttClient.UseDisconnectedHandler(async e =>
            {
                await _hubContext.Clients.All.SendAsync("MqttData","Server MQTT Disconnected");
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

                    var NewResolver = db.Resolvers.Where(r => r.Guid == data.GetValue("Guid").ToString());

                    await _hubContext.Clients.All.SendAsync("AddResolver", NewResolver);
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
