using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using VeterinariaSan.Data;
using VeterinariaSan.Models;
using VeterinariaSan.Dto;

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
        public async Task<IActionResult> ListarPersonas()
        {
            var personas = await _context.Personas
                .Select(p => new PersonaResponseDto
                {
                    DocPersona = p.DocPersona,
                    TipoDoc = p.TipoDoc,
                    Nombres = p.Nombres,
                    Apellidos = p.Apellidos,
                    Email = p.Email,
                    Telefono = p.Telefono,
                    Usuario = p.Usuario
                })
                .ToListAsync();

            return Ok(personas);
        }

        [HttpGet("Listar/{DocPersona}")]
        public async Task<IActionResult> ListarPersonaPorId(int DocPersona)
        {
            var persona = await _context.Personas
                .Where(p => p.DocPersona == DocPersona)
                .Select(p => new PersonaResponseDto
                {
                    DocPersona = p.DocPersona,
                    TipoDoc = p.TipoDoc,
                    Nombres = p.Nombres,
                    Apellidos = p.Apellidos,
                    Email = p.Email,
                    Telefono = p.Telefono,
                    Usuario = p.Usuario
                })
                .FirstOrDefaultAsync();

            if (persona == null)
                return NotFound("Persona no encontrada.");

            return Ok(persona);
        }

        [HttpPost("Crear")]
        public async Task<IActionResult> CrearPersona(PersonaCreateDto dto)
        {
            var existe = await _context.Personas
                .AnyAsync(p => p.DocPersona == dto.DocPersona);

            if (existe)
                return BadRequest("Persona ya registrada.");

            var persona = new Persona
            {
                DocPersona = dto.DocPersona,
                TipoDoc = dto.TipoDoc,
                Nombres = dto.Nombres,
                Apellidos = dto.Apellidos,
                Email = dto.Email,
                Telefono = dto.Telefono,
                Usuario = dto.Usuario,
                Password = dto.Password
            };

            _context.Personas.Add(persona);

            await _context.SaveChangesAsync();

            return Ok(new PersonaResponseDto
            {
                DocPersona = persona.DocPersona,
                TipoDoc = persona.TipoDoc,
                Nombres = persona.Nombres,
                Apellidos = persona.Apellidos,
                Email = persona.Email,
                Telefono = persona.Telefono,
                Usuario = persona.Usuario
            });
        }

        [HttpPut("Actualizar/{DocPersona}")]
        public async Task<IActionResult> ActualizarPersona(int DocPersona, PersonaUpdateDto dto)
        {
            if (dto == null)
                return BadRequest();

            var persona = await _context.Personas
                .FindAsync(DocPersona);

            if (persona == null)
                return NotFound("Persona no encontrada.");

            persona.TipoDoc = dto.TipoDoc;
            persona.Nombres = dto.Nombres;
            persona.Apellidos = dto.Apellidos;
            persona.Email = dto.Email;
            persona.Telefono = dto.Telefono;
            persona.Usuario = dto.Usuario;
            persona.Password = dto.Password;

            await _context.SaveChangesAsync();

            return Ok(new PersonaResponseDto
            {
                DocPersona = persona.DocPersona,
                TipoDoc = persona.TipoDoc,
                Nombres = persona.Nombres,
                Apellidos = persona.Apellidos,
                Email = persona.Email,
                Telefono = persona.Telefono,
                Usuario = persona.Usuario
            });
        }

        [HttpDelete("Eliminar/{DocPersona}")]
        public async Task<IActionResult> EliminarPersona(int DocPersona)
        {
            var persona = await _context.Personas
                .FindAsync(DocPersona);

            if (persona == null)
                return NotFound("Persona no encontrada.");

            var tieneMascotas = await _context.Mascota
                .AnyAsync(m => m.Dueño == DocPersona);

            if (tieneMascotas)
                return BadRequest(
                    "La persona tiene mascotas asociadas.");

            _context.Personas.Remove(persona);

            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
