using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace provaTCS.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StatusController : ControllerBase
    {
        // GET: api/Status
        [HttpGet]
        public IEnumerable<dynamic> Get()
        {
            return new MODEL.Status().GetAll();
        }
        // GET: api/Status/GetAtivos
        [HttpGet]
        [Route("api/[controller]/GetAtivos")]
        public IEnumerable<dynamic> GetAtivos()
        {
            return new MODEL.Status().GetAtivos();
        }

        // GET: api/Status/5
        [HttpGet("{id}", Name = "Get")]
        public string Get(int id)
        {
            return "value";
        }

        [Route("[action]/{Codigo}")]
        [HttpGet]
        public bool CheckCodigoExists(string Codigo)
        {
            return new MODEL.Status().CheckCodigoExists(Codigo);
        }

        [Route("[action]/{Nome}")]
        [HttpGet]
        public bool CheckNomeStatusExists(string Nome)
        {
            return new MODEL.Status().CheckNomeStatusExists(Nome);
        }

        // POST: api/Status
        [HttpPost]
        public void Post(MODEL.Status dados)
        {
            dados.Insert();
        }

        // PUT: api/Status/
        [HttpPut]
        public void Put(MODEL.Status dados)
        {
            dados.Update();
        }
        
    }
}
