using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using VeterinariaSan.Data;
using VeterinariaSan.Dto;
using VeterinariaSan.Models;

namespace VeterinariaSan.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PersonaRolController : ControllerBase
    {
        private readonly VeterinariaContext _context;

        public PersonaRolController(VeterinariaContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> ListarPersonaRoles()
        {
            var personaRoles = await _context.PersonaRols
                .Include(pr => pr.PersonaDocPersonaNavigation)
                .Include(pr => pr.RolIdRolNavigation)
                .Select(pr => new PersonaRolResponseDto
                {
                    IdPersonaRol = pr.IdPersonaRol,
                    PersonaDocPersona = pr.PersonaDocPersona,
                    PersonaNombre = pr.PersonaDocPersonaNavigation.Nombres,
                    RolIdRol = pr.RolIdRol,
                    RolNombre = pr.RolIdRolNavigation.NombreRol
                })
                .ToListAsync();

            return Ok(personaRoles);
        }

        [HttpGet("Persona/{docPersona}")]
        public async Task<IActionResult> ObtenerRolesPersona(int docPersona)
        {
            var roles = await _context.PersonaRols
                .Where(pr => pr.PersonaDocPersona == docPersona)
                .Select(pr => new
                {
                    pr.IdPersonaRol,
                    pr.RolIdRol,
                    Rol = pr.RolIdRolNavigation.NombreRol
                })
                .ToListAsync();

            return Ok(roles);
        }

        [HttpGet("Clientes")]
        public async Task<IActionResult> ObtenerClientes()
        {
            var clientes = await _context.PersonaRols
                .Include(pr => pr.PersonaDocPersonaNavigation)
                .Where(pr => pr.RolIdRol == 2)
                .Select(pr => new ClienteDto
                {
                    DocPersona = pr.PersonaDocPersona,
                    Nombre = pr.PersonaDocPersonaNavigation.Nombres + " " +
                             pr.PersonaDocPersonaNavigation.Apellidos
                })
                .ToListAsync();

            return Ok(clientes);
        }

        [HttpGet("Veterinarios")]
        public async Task<IActionResult> ObtenerVeterinarios()
        {
            var veterinarios = await _context.PersonaRols
                .Include(pr => pr.PersonaDocPersonaNavigation)
                .Where(pr => pr.RolIdRol == 3)
                .Select(pr => new VeterinarioDto
                {
                    DocPersona = pr.PersonaDocPersona,
                    Nombre = pr.PersonaDocPersonaNavigation.Nombres + " " +
                             pr.PersonaDocPersonaNavigation.Apellidos
                })
                .ToListAsync();

            return Ok(veterinarios);
        }

        [HttpGet("Administradores")]
        public async Task<IActionResult> ObtenerAdministradores()
        {
            var administradores = await _context.PersonaRols
                .Include(pr => pr.PersonaDocPersonaNavigation)
                .Where(pr => pr.RolIdRol == 1)
                .Select(pr => new Administrador
                {
                    DocPersona = pr.PersonaDocPersona,
                    Nombre = pr.PersonaDocPersonaNavigation.Nombres + " " +
                             pr.PersonaDocPersonaNavigation.Apellidos
                })
                .ToListAsync();

            return Ok(administradores);
        }

        [HttpPost("Crear")]
        public async Task<IActionResult> CrearPersonaRol(PersonaRolCreateDto dto)
        {
            var personaExiste = await _context.Personas
                .AnyAsync(p => p.DocPersona == dto.PersonaDocPersona);

            if (!personaExiste)
                return BadRequest("La persona no existe.");

            var rolExiste = await _context.Rols
                .AnyAsync(r => r.IdRol == dto.RolIdRol);

            if (!rolExiste)
                return BadRequest("El rol no existe.");

            var relacionExiste = await _context.PersonaRols
                .AnyAsync(pr =>
                    pr.PersonaDocPersona == dto.PersonaDocPersona &&
                    pr.RolIdRol == dto.RolIdRol);

            if (relacionExiste)
                return BadRequest("La relación ya existe.");

            var personaRol = new PersonaRol
            {
                PersonaDocPersona = dto.PersonaDocPersona,
                RolIdRol = dto.RolIdRol
            };

            _context.PersonaRols.Add(personaRol);

            await _context.SaveChangesAsync();

            return Ok(personaRol);
        }

        [HttpDelete("Eliminar/{IdPersonaRol}")]
        public async Task<IActionResult> EliminarPersonaRol(
            int IdPersonaRol)
        {
            var personaRol = await _context.PersonaRols
                .FindAsync(IdPersonaRol);

            if (personaRol == null)
                return NotFound("Relación no encontrada.");

            _context.PersonaRols.Remove(personaRol);

            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
