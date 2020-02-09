using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace PlatformManagementConsole.Models
{
   
    public class Resolver
    {
        public int Id { get; set; }
        public string Guid { get; set; }
        public string Name { get; set; }
        public string DeviceType { get; set; }
        public string Platform { get; set; }
        public string OsVersion { get; set; }
        public string OEM { get; set; }
        public string Model { get; set; }
        public bool IsOnline { get; set; }
    }
    
}
