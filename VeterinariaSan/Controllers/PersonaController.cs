using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using VeterinariaSan.Data;
using VeterinariaSan.Models;

namespace VeterinariaSan.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PersonaController : ControllerBase
    {
        private readonly VeterinariaContext _context;

        public PersonaController(VeterinariaContext context)
        {
            _context = context;

        }

        [HttpGet]
        public async Task<IActionResult>ListarPersonas()
        {
            var PersonaListar = await _context.Personas.ToListAsync();
            return Ok(PersonaListar);
        }

        [HttpGet("Listar/{DocPersona}")]
        public async Task<IActionResult>ListarPersonasBiID(int DocPersona)
        {
            var PersonaId = await _context.Personas.FindAsync(DocPersona);
            if (PersonaId == null)
                return NotFound("Persona Actualmento no registrada.");
            return Ok(PersonaId);
        }

        [HttpPost("Crear")]
        public async Task<IActionResult>CrearPersona(Persona persona)
        {
            if (persona == null)
                return BadRequest();
            var PerValida = await _context.Personas.AnyAsync(
                p=> p.DocPersona == persona.DocPersona
                );
            if (PerValida)
            {
                return BadRequest("Pesona Ya registrada.");
            }
            _context.Personas.Add(persona);
            await _context.SaveChangesAsync();
           
            return Ok(persona);
        }
    }
}
