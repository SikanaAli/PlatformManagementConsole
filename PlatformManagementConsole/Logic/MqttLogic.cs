using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Text;
using Newtonsoft.Json.Linq;
using MQTTnet;
using MQTTnet.Client;
using MQTTnet.Client.Options;
using Microsoft.AspNetCore.SignalR;
using PlatformManagementConsole.Contexts;
using PlatformManagementConsole.Models;
using PlatformManagementConsole.Hubs;

namespace PlatformManagementConsole.Logic
{
    public class MqttLogic
    {
        
        private readonly IHubContext<PmcHub> _hubContext;

        

        public  MqttLogic(IHubContext<PmcHub> hubContext)
        {
            _hubContext = hubContext;
        }

        
        
    }
}
