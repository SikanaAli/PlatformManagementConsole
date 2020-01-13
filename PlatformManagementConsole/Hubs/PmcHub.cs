using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using PlatformManagementConsole.Contexts;
using PlatformManagementConsole.Models;


namespace PlatformManagementConsole.Hubs
{
    public class PmcHub : Hub
    {
        

        public async Task SendMessage(string user, string message)
        {
            await Clients.All.SendAsync("ReceiveMessage", user, message);
        }

        public class clientResolver
        {
            public string Id { get; set; }
            public string Text { get; set; }
            public string DeviceType { get; set; }
            public string Platform { get; set; }
            public string OsVersion { get; set; }
            public string OEM { get; set; }
            public string Model { get; set; }
            public bool IsOnline { get; set; }

        }



        public async Task RefreshResolvers()
        {
            using(var db = new PmcDbContext())
            {
                

                var dbList = db.Resolvers.ToList();
                List<clientResolver> clientResolvers = new List<clientResolver>();

                foreach (var item in dbList)
                {
                    clientResolvers.Add(new clientResolver
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
                await Clients.All.SendAsync("RefreshResolver", clientResolvers);
            }
        }
    }
}
