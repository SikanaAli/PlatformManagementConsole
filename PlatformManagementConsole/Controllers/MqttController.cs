using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using MQTTnet;
using MQTTnet.Client;
using MQTTnet.Client.Options;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

using PlatformManagementConsole.Hubs;
using PlatformManagementConsole.Models;
using PlatformManagementConsole.Contexts;

namespace PlatformManagementConsole.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MqttController : ControllerBase
    {

        private readonly IHubContext<PmcHub> _hubContext;

        public MqttController(IHubContext<PmcHub> hubContext)
        {

            _hubContext = hubContext;
        }


        private static IMqttClient Client = new MqttFactory().CreateMqttClient();
        private string MQTT_IP = "test.mosquitto.org";
        private int MQTT_Port = 8080;
        private float MQTT_KeepAlive = 10.0f;
        private const string RESOLVER_INIT = "cmsb2/resolver/init";
        private const string RESOLVER_CLIENT_FORMS = "cmsb4/resolver/forms";


        
        [HttpPost]
        [Route("Initialize")]
        public async Task<HttpResponseMessage> StartMqtt()
        {
            var response = new HttpResponseMessage();
            if (Client.IsConnected)
            {
                response.StatusCode = HttpStatusCode.AlreadyReported;
                response.ReasonPhrase = "Mqtt Already Connected";
                await Task.Delay(100);
                return response;
            }
            else
            {
                await MqttConfigStart(MQTT_IP,MQTT_Port,MQTT_KeepAlive);

                
                if (Client.IsConnected)
                {
                    response.StatusCode = HttpStatusCode.OK;
                    response.ReasonPhrase = "Mqtt Connected";
                    return response;
                }
                response.StatusCode = HttpStatusCode.InternalServerError;
                return response;
            }

        }

        [Route("/mqttPublish")]
        [HttpPost]
        public async void MqttPublish(string Payload, string Topic)
        {
            if (Client.IsConnected)
            {
                var msg = new MqttApplicationMessageBuilder()
                    .WithTopic(Topic)
                    .WithPayload(Payload)
                    .WithExactlyOnceQoS()
                    .Build();

                await Client.PublishAsync(msg);
            }
            else
            {
                await _hubContext.Clients.All.SendAsync("MqttNoConnection", "Mqtt Not Connected");
            }
        }

        
        [HttpPost]
        [Route("SendForm")]
        public async Task<HttpResponseMessage> MqttSendForm([FromBody] JArray formJson)
        {
            if (Client.IsConnected)
            {
                var msg = new MqttApplicationMessageBuilder()
                    .WithTopic(RESOLVER_CLIENT_FORMS)
                    .WithPayload(Encoding.ASCII.GetBytes(formJson.ToString()))
                    .WithExactlyOnceQoS()
                    .Build();

                await Client.PublishAsync(msg);
                return new HttpResponseMessage(HttpStatusCode.OK);
            }
            else
            {
                await _hubContext.Clients.All.SendAsync("MqttNoConnection", "Mqtt Not Connected");
                return new HttpResponseMessage(HttpStatusCode.InternalServerError);
            }
        }
        
        private async Task MqttConfigStart(String MQTT_IP, int MQTT_Port, Double MQTT_KeepAlive)
        {

            var MqttOptions = new MqttClientOptionsBuilder()
            .WithClientId(Guid.NewGuid().ToString())
            .WithWebSocketServer(string.Format("{0}:{1}", MQTT_IP, MQTT_Port))
            .WithKeepAliveSendInterval(System.TimeSpan.FromSeconds(MQTT_KeepAlive))
            .WithCleanSession()
            .Build();

            

            Client.UseApplicationMessageReceivedHandler(async e =>
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


            Client.UseConnectedHandler(async e =>
            {
                string result = string.Format("Connected to MQTT broker with result code {0}", e.AuthenticateResult.ResultCode);

                await Client.SubscribeAsync("cmsb4/#");
                await Client.SubscribeAsync("cmsb2/#");
                await _hubContext.Clients.All.SendAsync("MqttConnected", result);
            });

            Client.UseDisconnectedHandler(async e =>
            {
                await _hubContext.Clients.All.SendAsync("MqttDisconnected", "Mqtt Connection Lost.\n Attempting Reconnection");
                Client.Dispose();

                await Task.Delay(5000);
                await Client.ConnectAsync(MqttOptions);
            });

            await Client.ConnectAsync(MqttOptions);

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