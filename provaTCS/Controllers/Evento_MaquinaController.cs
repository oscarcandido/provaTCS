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
    public class Evento_MaquinaController : ControllerBase
    {

        [Route("[action]")]
        [HttpGet]
        public IEnumerable<dynamic> GeraEventoAleatorio()
        {
            return new MODEL.Evento_Maquina().GeraEventoAleatorio();
        }

        // POST: api/Evento_Maquina
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT: api/Evento_Maquina/5
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
