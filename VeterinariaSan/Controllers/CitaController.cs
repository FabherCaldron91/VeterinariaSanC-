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
    public class CitaController : ControllerBase
    {
        private readonly VeterinariaContext _context;

        public CitaController(VeterinariaContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> ListarCitas()
        {
            var citas = await _context.Cita
                .Include(c => c.MascotaNavigation)
                .Include(c => c.VeterinarioNavigation)
                .Select(c => new CitaResponseDto
                {
                    IdCita = c.IdCita,
                    FechaHora = c.FechaHora ?? DateTime.MinValue,
                    Motivo = c.Motivo,
                    Estado = c.Estado,

                    MascotaNombre = c.MascotaNavigation!.NombreMascota,

                    VeterinarioNombre =
                        c.VeterinarioNavigation!.Nombres + " " +
                        c.VeterinarioNavigation.Apellidos
                })
                .ToListAsync();

            return Ok(citas);
        }

        [HttpGet("Mascota/{nombreMascota}")]
        public async Task<IActionResult> BuscarPorMascota(string nombreMascota)
        {
            var citas = await _context.Cita
                .Include(c => c.MascotaNavigation)
                .Where(c => c.MascotaNavigation.NombreMascota == nombreMascota)
                .ToListAsync();

            if (!citas.Any())
                return NotFound("No se encontraron citas para esa mascota.");

            return Ok(citas);
        }

        [HttpGet("{IdCita}")]
        public async Task<IActionResult> BuscarPorId(int IdCita)
        {
            var cita = await _context.Cita
                .Include(c => c.MascotaNavigation)
                .Include(c => c.VeterinarioNavigation)
                .Where(c => c.IdCita == IdCita)
                .Select(c => new CitaResponseDto
                {
                    IdCita = c.IdCita,
                    FechaHora = c.FechaHora ?? DateTime.MinValue,
                    Motivo = c.Motivo,
                    Estado = c.Estado,

                    MascotaNombre = c.MascotaNavigation!.NombreMascota,
                    VeterinarioNombre =
                        c.VeterinarioNavigation!.Nombres + " " +
                        c.VeterinarioNavigation.Apellidos
                })
                .FirstOrDefaultAsync();

            if (cita == null)
                return NotFound("Cita no encontrada.");

            return Ok(cita);
        }

        [HttpPost("Crear")]
        public async Task<IActionResult> CrearCita(CitaCreateDto dto)
        {
            var mascotaExiste = await _context.Mascota
                .AnyAsync(m => m.IdMascota == dto.Mascota);

            if (!mascotaExiste)
                return BadRequest("La mascota no existe.");

            var veterinarioExiste = await _context.Personas
                .AnyAsync(p => p.DocPersona == dto.Veterinario);

            if (!veterinarioExiste)
                return BadRequest("El veterinario no existe.");

            var cita = new Cita
            {
                FechaHora = dto.FechaHora,
                Motivo = dto.Motivo,
                Estado = dto.Estado,
                Mascota = dto.Mascota,
                Veterinario = dto.Veterinario
            };

            _context.Cita.Add(cita);

            await _context.SaveChangesAsync();

            return Ok(cita.IdCita);
        }

        [HttpPut("Actualizar/{IdCita}")]
        public async Task<IActionResult> ActualizarCita( int IdCita, CitaUpdateDto dto)
        {
            var cita = await _context.Cita.FindAsync(IdCita);

            if (cita == null)
                return NotFound("Cita no encontrada.");

            cita.FechaHora = dto.FechaHora;
            cita.Motivo = dto.Motivo;
            cita.Estado = dto.Estado;
            cita.Mascota = dto.Mascota;
            cita.Veterinario = dto.Veterinario;

            await _context.SaveChangesAsync();

            return Ok("Cita actualizada.");
        }

        [HttpDelete("Eliminar/{IdCita}")]
        public async Task<IActionResult> EliminarCita(int IdCita)
        {
            var cita = await _context.Cita.FindAsync(IdCita);

            if (cita == null)
                return NotFound("Cita no encontrada.");

            var tieneDetalle = await _context.DetalleHistoriaClinicas
                .AnyAsync(d => d.Cita == IdCita);

            if (tieneDetalle)
                return BadRequest(
                    "La cita tiene detalles asociados."
                );

            _context.Cita.Remove(cita);

            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
