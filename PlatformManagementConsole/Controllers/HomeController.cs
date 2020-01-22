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
using PlatformManagementConsole.Logic;

namespace PlatformManagementConsole.Controllers
{
    public class HomeController : Controller
    {
        

        private IMqttClient Client = new MqttFactory().CreateMqttClient();

        public IMqttClient MqttClient
        {
            get
            {
                return Client;
            }
            set
            {
                Client = value;
            }

        }


        public string MQTT_IP = "test.mosquitto.org";
        public int MQTT_Port = 8080;
        public float MQTT_KeepAlive = 10.0f;
        public const string RESOLVER_INIT = "cmsb2/resolver/init";


        private readonly IHubContext<PmcHub> _hubContext;

        public HomeController(IHubContext<PmcHub> hubContext)
        {
            
            _hubContext = hubContext;
        }

        //Index Page Route
        [HttpGet]
        public IActionResult Index()
        {
            return View();
        }

        

        public ActionResult Mqtt()
        {
            MqttConfigStart(MQTT_IP, MQTT_Port, MQTT_KeepAlive);
            
            return Content("Mqtt Route", "text/html");
        }

        public IActionResult BuildForm()
        {
            return View();
        }


        [Route("Home/Publish")]
        public IActionResult Publish(string id,string msg)
        {
            Console.WriteLine("ID => {0} MSG => {1}", id, msg);
            
            return Content("Published", "text/html");
        }


        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }



        //MQTT Code
        public async void MqttConfigStart(String MQTT_IP, int MQTT_Port, Double MQTT_KeepAlive)
        {

                var MqttOptions = new MqttClientOptionsBuilder()
                .WithClientId(Guid.NewGuid().ToString())
                .WithWebSocketServer(string.Format("{0}:{1}", MQTT_IP, MQTT_Port))
                .WithKeepAliveSendInterval(System.TimeSpan.FromSeconds(MQTT_KeepAlive))
                .WithCleanSession()
                .Build();

                MqttClient = new MqttFactory().CreateMqttClient();

                MqttClient.UseApplicationMessageReceivedHandler(async e =>
                {
                    string topic = e.ApplicationMessage.Topic;
                    
                    switch (topic)
                    {
                        case RESOLVER_INIT:
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


                MqttClient.UseConnectedHandler(async e =>
                {
                    string result = string.Format("Connected to MQTT broker with result code {0}", e.AuthenticateResult.ResultCode);

                    await MqttClient.SubscribeAsync("cmsb/#");
                    await MqttClient.SubscribeAsync("cmsb2/#");
                    await _hubContext.Clients.All.SendAsync("MqttConnected", result);
                });

                MqttClient.UseDisconnectedHandler(async e =>
                {
                    await _hubContext.Clients.All.SendAsync("MqttDisconnected", "Mqtt Connection Lost.\n Attempting Reconnection");
                    MqttClient.Dispose();

                    await Task.Delay(5000);
                    await MqttClient.ConnectAsync(MqttOptions);
                });

            await MqttClient.ConnectAsync(MqttOptions);
            
        }

        public async void MqttPublish(string Payload, string Topic)
        {
            if (MqttClient.IsConnected)
            {
                var msg = new MqttApplicationMessageBuilder()
                    .WithTopic(Topic)
                    .WithPayload(Payload)
                    .WithExactlyOnceQoS()
                    .Build();

                await MqttClient.PublishAsync(msg);
            }
            else
            {
                await _hubContext.Clients.All.SendAsync("MqttNoConnection", "Mqtt Not Connected");
            }
        }


        private async Task AddResolver(string payload)
        {
            var data = JObject.Parse(payload);

            using (var db = new PmcDbContext())
            {
                if (db.Resolvers.Count((item) => item.Guid == data.GetValue("Guid").ToString()) == 0)
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
    }
}
