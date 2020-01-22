using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Text.RegularExpressions;
using Newtonsoft.Json.Linq;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PlatformManagementConsole.Contexts;
using PlatformManagementConsole.Models;

namespace PlatformManagementConsole.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FormsController : ControllerBase
    {
        // GET: api/Forms
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET: api/Forms/5
        [HttpGet("{id}", Name = "Get")]
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/Forms
        [HttpPost]
        public string Post([FromBody] JObject value)
        {
            //Regex html = new Regex();
            value.GetValue("");
            return value.ToString();
        }

        // PUT: api/Forms/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }


        
    }
}
