using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using VeterinariaSan.Data;
using VeterinariaSan.Dto;
using VeterinariaSan.Models;

namespace VeterinariaSan.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DetalleHistoriaClinicaController : ControllerBase
    {
        private readonly VeterinariaContext _context;

        public DetalleHistoriaClinicaController(VeterinariaContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> Listar()
        {
            var detalles = await _context.DetalleHistoriaClinicas
                .Include(d => d.VeterinarioNavigation)
                .Include(d => d.HistoriaClinicaNavigation)
                    .ThenInclude(h => h.MascotaNavigation)
                .Select(d => new DetalleHistoriaClinicaResponseDto
                {
                    IdDetalle = d.IdDetalle,
                    Fecha = d.Fecha ?? DateTime.MinValue,
                    Diagnostico = d.Diagnostico,
                    Tratamiento = d.Tratamiento,
                    VeterinarioNombre =
                        d.VeterinarioNavigation!.Nombres + " " +
                        d.VeterinarioNavigation.Apellidos,
                    MascotaNombre =
                        d.HistoriaClinicaNavigation!.MascotaNavigation!.NombreMascota
                })
                .ToListAsync();

            return Ok(detalles);
        }

        [HttpGet("{IdDetalle}")]
        public async Task<IActionResult> BuscarPorId(int IdDetalle)
        {
            var detalle = await _context.DetalleHistoriaClinicas
                .Include(d => d.VeterinarioNavigation)
                .Include(d => d.HistoriaClinicaNavigation)
                    .ThenInclude(h => h.MascotaNavigation)
                .Where(d => d.IdDetalle == IdDetalle)
                .Select(d => new DetalleHistoriaClinicaResponseDto
                {
                    IdDetalle = d.IdDetalle,
                    Fecha = d.Fecha ?? DateTime.MinValue,
                    Diagnostico = d.Diagnostico,
                    Tratamiento = d.Tratamiento,
                    VeterinarioNombre =
                        d.VeterinarioNavigation!.Nombres + " " +
                        d.VeterinarioNavigation.Apellidos,
                    MascotaNombre =
                        d.HistoriaClinicaNavigation!.MascotaNavigation!.NombreMascota
                })
                .FirstOrDefaultAsync();

            if (detalle == null)
                return NotFound("Detalle no encontrado.");

            return Ok(detalle);
        }

        [HttpPost("Crear")]
        public async Task<IActionResult> Crear(DetalleHistoriaClinicaCreateDto dto)
        {
            var historiaExiste = await _context.HistoriaClinicas
                .AnyAsync(h => h.IdHistoriaClinica == dto.HistoriaClinica);

            if (!historiaExiste)
                return BadRequest("La historia clínica no existe.");

            var veterinarioExiste = await _context.Personas
                .AnyAsync(v => v.DocPersona == dto.Veterinario);

            if (!veterinarioExiste)
                return BadRequest("El veterinario no existe.");

            var citaExiste = await _context.Cita
                .AnyAsync(c => c.IdCita == dto.Cita);

            if (!citaExiste)
                return BadRequest("La cita no existe.");

            var detalle = new DetalleHistoriaClinica
            {
                Fecha = dto.Fecha,
                Diagnostico = dto.Diagnostico,
                Tratamiento = dto.Tratamiento,
                HistoriaClinica = dto.HistoriaClinica,
                Veterinario = dto.Veterinario,
                Cita = dto.Cita
            };

            _context.DetalleHistoriaClinicas.Add(detalle);

            await _context.SaveChangesAsync();

            return Ok(detalle.IdDetalle);
        }

        [HttpPut("Actualizar/{IdDetalle}")]
        public async Task<IActionResult> Actualizar(int IdDetalle, DetalleHistoriaClinicaUpdateDto dto)
        {
            var detalle = await _context.DetalleHistoriaClinicas
                .FindAsync(IdDetalle);

            if (detalle == null)
                return NotFound("Detalle no encontrado.");

            detalle.Fecha = dto.Fecha;
            detalle.Diagnostico = dto.Diagnostico;
            detalle.Tratamiento = dto.Tratamiento;

            await _context.SaveChangesAsync();

            return Ok("Detalle actualizado.");
        }

        [HttpDelete("Eliminar/{IdDetalle}")]
        public async Task<IActionResult> Eliminar(int IdDetalle)
        {
            var detalle = await _context.DetalleHistoriaClinicas
                .FindAsync(IdDetalle);

            if (detalle == null)
                return NotFound("Detalle no encontrado.");

            _context.DetalleHistoriaClinicas.Remove(detalle);

            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}