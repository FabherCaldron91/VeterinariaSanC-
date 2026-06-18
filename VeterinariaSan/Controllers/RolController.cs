using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using VeterinariaSan.Data;
using VeterinariaSan.Dto;
using VeterinariaSan.Models;

namespace VeterinariaSan.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RolController : ControllerBase
    {
        private readonly VeterinariaContext _context;

        public RolController(VeterinariaContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> ListarRoles()
        {
            var roles = await _context.Rols
                .Select(r => new RolResponseDto
                {
                    IdRol = r.IdRol,
                    NombreRol = r.NombreRol
                })
                .ToListAsync();

            return Ok(roles);
        }

        [HttpGet("{IdRol}")]
        public async Task<IActionResult> BuscarPorId(int IdRol)
        {
            var rol = await _context.Rols
                .Where(r => r.IdRol == IdRol)
                .Select(r => new RolResponseDto
                {
                    IdRol = r.IdRol,
                    NombreRol = r.NombreRol
                })
                .FirstOrDefaultAsync();

            if (rol == null)
                return NotFound("Rol no encontrado.");

            return Ok(rol);
        }

        [HttpPost("Crear")]
        public async Task<IActionResult> CrearRol(RolCreateDto dto)
        {
            if (string.IsNullOrWhiteSpace(dto.NombreRol))
                return BadRequest("Debe ingresar un nombre de rol.");

            var existe = await _context.Rols
                .AnyAsync(r => r.NombreRol == dto.NombreRol.ToLower());

            if (existe)
                return BadRequest("El rol ya existe.");

            var rol = new Rol
            {
                NombreRol = dto.NombreRol
            };

            _context.Rols.Add(rol);

            await _context.SaveChangesAsync();

            return Ok(new RolResponseDto
            {
                IdRol = rol.IdRol,
                NombreRol = rol.NombreRol
            });
        }

        [HttpPut("Actualizar/{IdRol}")]
        public async Task<IActionResult> ActualizarRol(
            int IdRol,
            RolCreateDto dto)
        {
            var rol = await _context.Rols
                .FindAsync(IdRol);

            if (rol == null)
                return NotFound("Rol no encontrado.");

            rol.NombreRol = dto.NombreRol.ToLower();

            await _context.SaveChangesAsync();

            return Ok(new RolResponseDto
            {
                IdRol = rol.IdRol,
                NombreRol = rol.NombreRol
            });
        }

        [HttpDelete("Eliminar/{IdRol}")]
        public async Task<IActionResult> EliminarRol(int IdRol)
        {
            var rol = await _context.Rols
                .FindAsync(IdRol);

            if (rol == null)
                return NotFound("Rol no encontrado.");

            var tienePersonas = await _context.PersonaRols
                .AnyAsync(pr => pr.RolIdRol == IdRol);

            if (tienePersonas)
                return BadRequest(
                    "El rol tiene personas asociadas."
                );

            _context.Rols.Remove(rol);

            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}