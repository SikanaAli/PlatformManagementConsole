using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PlatformManagementConsole.Models
{
    public class Message
    {
        public int Id { get; set; }
        public string Image { get; set; }
        public string Title { get; set; }
        public string Content { get; set; }
        public string Link { get; set; }
        public string LinkTitle { get; set; }
        public int LinkType { get; set; }
        public int MsgFormat { get; set; }
        public DateTime MsgExp { get; set; }
        public string MsgHtml { get; set; }
        public string MsgJson { get; set; }


    }
}
