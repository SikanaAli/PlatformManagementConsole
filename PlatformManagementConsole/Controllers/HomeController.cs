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

                data.Add("topic", e.ApplicationMessage.Topic.ToString());
                data.Add("msg", Encoding.UTF8.GetString(e.ApplicationMessage.Payload));

                var dataToSend = data.ToString();
                Console.WriteLine(dataToSend);
                await _hubContext.Clients.All.SendAsync("MqttData", dataToSend);
            });


            mqttClient.UseConnectedHandler(async e =>
            {
                string result = "Connected to MQTT broker with result code {0}" + e.AuthenticateResult.ResultCode;

                await mqttClient.SubscribeAsync("cmsb/#");
                await _hubContext.Clients.All.SendAsync("MqttData", result);
            });

            mqttClient.UseDisconnectedHandler(async e =>
            {
                await _hubContext.Clients.All.SendAsync("MqttData", "Disconnected");
            });


            await mqttClient.ConnectAsync(mqttClientOptions);
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
