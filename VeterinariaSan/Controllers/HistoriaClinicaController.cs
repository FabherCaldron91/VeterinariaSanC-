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
    public class HistoriaClinicaController : ControllerBase
    {
        private readonly VeterinariaContext _context;

        public HistoriaClinicaController(VeterinariaContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> ListarHistorias()
        {
            var historias = await _context.HistoriaClinicas
                .Include(h => h.MascotaNavigation)
                .Select(h => new HistoriaClinicaResponseDto
                {
                    IdHistoriaClinica = h.IdHistoriaClinica,
                    MascotaId = h.Mascota ?? 0,
                    MascotaNombre = h.MascotaNavigation!.NombreMascota
                })
                .ToListAsync();

            return Ok(historias);
        }

        [HttpGet("{IdHistoriaClinica}")]
        public async Task<IActionResult> BuscarPorId(int IdHistoriaClinica)
        {
            var historia = await _context.HistoriaClinicas
                .Include(h => h.MascotaNavigation)
                .Where(h => h.IdHistoriaClinica == IdHistoriaClinica)
                .Select(h => new HistoriaClinicaResponseDto
                {
                    IdHistoriaClinica = h.IdHistoriaClinica,
                    MascotaId = h.Mascota ?? 0,
                    MascotaNombre = h.MascotaNavigation!.NombreMascota
                })
                .FirstOrDefaultAsync();

            if (historia == null)
                return NotFound("Historia clínica no encontrada.");

            return Ok(historia);
        }

        [HttpPost("Crear")]
        public async Task<IActionResult> CrearHistoria(HistoriaClinicaCreateDto dto)
        {
            var mascotaExiste = await _context.Mascota
                .AnyAsync(m => m.IdMascota == dto.Mascota);

            if (!mascotaExiste)
                return BadRequest("La mascota no existe.");

            var historiaExiste = await _context.HistoriaClinicas
                .AnyAsync(h => h.Mascota == dto.Mascota);

            if (historiaExiste)
                return BadRequest(
                    "La mascota ya tiene una historia clínica."
                );

            var historia = new HistoriaClinica
            {
                Mascota = dto.Mascota
            };

            _context.HistoriaClinicas.Add(historia);

            await _context.SaveChangesAsync();

            return Ok(historia.IdHistoriaClinica);
        }

        [HttpDelete("Eliminar/{IdHistoriaClinica}")]
        public async Task<IActionResult> EliminarHistoria(int IdHistoriaClinica)
        {
            var historia = await _context.HistoriaClinicas
                .FindAsync(IdHistoriaClinica);

            if (historia == null)
                return NotFound("Historia clínica no encontrada.");

            var tieneDetalles = await _context.DetalleHistoriaClinicas
                .AnyAsync(d => d.HistoriaClinica == IdHistoriaClinica);

            if (tieneDetalles)
                return BadRequest(
                    "La historia clínica tiene detalles asociados."
                );

            _context.HistoriaClinicas.Remove(historia);

            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
