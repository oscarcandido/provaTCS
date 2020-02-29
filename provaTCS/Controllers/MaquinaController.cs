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
    public class MaquinaController : ControllerBase
    {
        // GET: api/Maquina
        [HttpGet]
        public IEnumerable<dynamic> GetAll()
        {
            return new MODEL.Maquina().GetAll();
        }

        [HttpGet]
        [Route("api/[controller]/Getall")]
        public IEnumerable<dynamic> GetAtivos()
        {
            return new MODEL.Maquina().GetAtivos();
        }
        // GET: api/Maquina/5
        [HttpGet("{id}", Name = "Get")]
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/Maquina
        [HttpPost]
        public void Post(MODEL.Maquina dados)
        {
            dados.Insert();
        }

        // PUT: api/Maquina/5
        [HttpPut]
        public void Put(MODEL.Maquina dados)
        {
            dados.Update();
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
