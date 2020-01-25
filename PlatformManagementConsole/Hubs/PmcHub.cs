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
        //private static IHubContext hubContext = GlobalHost.ConnectionManager.GetHubContext<PmcHub>();

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
                

                var ResolverList = db.Resolvers.ToList();
                List<clientResolver> clientResolvers = new List<clientResolver>();

                foreach (var Reoslver in ResolverList)
                {
                    clientResolvers.Add(new clientResolver
                    {
                        Id = Reoslver.Guid,
                        Text = Reoslver.Name,
                        DeviceType = Reoslver.DeviceType,
                        Platform = Reoslver.Platform,
                        OsVersion = Reoslver.OsVersion,
                        OEM = Reoslver.OEM,
                        Model = Reoslver.Model,
                        IsOnline = Reoslver.IsOnline

                    });
                }
                await Clients.All.SendAsync("RefreshResolver", clientResolvers);
            }
        }


        public async Task RefreshFormsList()
        {
            using (var db = new PmcDbContext())
            {
                var FormsList = db.Forms.ToList();
                await Clients.All.SendAsync("RefreshFormsList", FormsList);
            }
        }

    }
}
