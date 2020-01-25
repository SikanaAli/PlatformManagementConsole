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
using HtmlAgilityPack;
using System.Net.Http;
using System.Net;
using PlatformManagementConsole.Hubs;
using Microsoft.AspNetCore.SignalR;

namespace PlatformManagementConsole.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FormsController : ControllerBase
    {

        private readonly IHubContext<PmcHub> _hubContext;

        public FormsController(IHubContext<PmcHub> hubContext)
        {

            _hubContext = hubContext;
        }



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
        public async Task<HttpResponseMessage> Post([FromBody] JObject form)
        {
            

            HtmlAgilityPack.HtmlDocument htmlDoc = new HtmlAgilityPack.HtmlDocument();

            if (form.GetValue("Title").ToString() != (string.Empty) )
            {
                htmlDoc.LoadHtml(form.GetValue("Html").ToString());
                
                    using(var db = new PmcDbContext())
                    {
                        try
                        {
                            db.Forms.Add(new Forms
                            {
                                Title = form.GetValue("Title").ToString(),
                                Html = form.GetValue("Html").ToString(),
                            });

                            db.SaveChanges();

                            var FormsList = db.Forms.ToList();
                            await _hubContext.Clients.All.SendAsync("RefreshFormsList", FormsList);
                        }
                        catch (Exception)
                        {
                            return new HttpResponseMessage(HttpStatusCode.InternalServerError);
                        }
                    }

                    

                    return new HttpResponseMessage(HttpStatusCode.OK);
                
            }
            var msg = new HttpResponseMessage(HttpStatusCode.BadRequest);
                msg.ReasonPhrase = "HTML Parse Erroes";
            return msg;
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
