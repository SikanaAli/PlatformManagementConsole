using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using PlatformManagementConsole.Contexts;


namespace PlatformManagementConsole.Hubs
{
    public class PmcHub : Hub
    {
        

        public async Task SendMessage(string user, string message)
        {
            await Clients.All.SendAsync("ReceiveMessage", user, message);
        }

        public async Task MqttConnection()
        {





            //await MakeMqttConnection();
            Console.WriteLine("\n\n\n\n\n\n\nMQTT Invoke\n\n\n\n\n\n\n\n\n");
            await Clients.All.SendAsync("MqttData", "Connected");
        }

        public async Task mqttHelper(string data)
        {
            
            await Clients.All.SendAsync("MqttData",data);
        }


        public async Task RequestRefreshResolvers()
        {
            using(var db = new PmcDbContext())
            {
                var data = db.Resolvers;
                await Clients.All.SendAsync("RefreshResolvers", data);
            }


            
        }

    }
}
