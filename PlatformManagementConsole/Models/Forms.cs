using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;


namespace PlatformManagementConsole.Models
{
    public class Forms
    {
        private int _Id;

        public int Id 
        {
            get 
            {
                return _Id;
            }
            set 
            {
                _Id = value;
            } 
        }
        public string Title { get; set; }
        public String Html { get; set; }
        public String JsonForm { get; set; }
    }
}
