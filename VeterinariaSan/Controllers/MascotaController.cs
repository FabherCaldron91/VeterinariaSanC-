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
    public class MascotaController : ControllerBase
    {
        private readonly VeterinariaContext _context;

        public MascotaController(VeterinariaContext context)
        {
            _context = context;

        }

        [HttpGet]
        public async Task<IActionResult> ListarMascota()
        {
            var mascota = await _context.Mascota.
                Select(m => new MascotaResponseDto
                {
                    IdMascota = m.IdMascota,
                    NombreMascota = m.NombreMascota,
                    Especie = m.Especie,
                    Raza = m.Raza,
                    FechaNacimiento = m.FechaNacimiento ?? DateTime.MinValue,
                  
                    Dueño = m.Dueño,
                    DueñoNombre = m.DueñoNavigation.Nombres + " " +
                                   m.DueñoNavigation.Apellidos

                })
                .ToListAsync();
            return Ok(mascota);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> BuscarMascota(int id)
        {
            var mascota = await _context.Mascota
                .Where(m => m.IdMascota == id)
                .Select(m => new MascotaResponseDto
                {
                    IdMascota = m.IdMascota,
                    NombreMascota = m.NombreMascota,
                    Especie = m.Especie,
                    Raza = m.Raza,
                    FechaNacimiento = m.FechaNacimiento ?? DateTime.MinValue,

                    DueñoNombre = m.DueñoNavigation.Nombres + " " +
                                  m.DueñoNavigation.Apellidos
                })
                .FirstOrDefaultAsync();

            if (mascota == null)
                return NotFound();

            return Ok(mascota);
        }

        [HttpGet("Cliente/{docPersona}")]
        public async Task<IActionResult> ObtenerMascotasCliente(int docPersona)
        {
            var mascotas = await _context.Mascota
                .Where(m => m.Dueño == docPersona)
                .Select(m => new MascotaResponseDto
                {
                    IdMascota = m.IdMascota,
                    NombreMascota = m.NombreMascota,
                    Especie = m.Especie,
                    Raza = m.Raza,
                    FechaNacimiento = m.FechaNacimiento ?? DateTime.MinValue,

                    Dueño = m.Dueño,
                    DueñoNombre = m.DueñoNavigation.Nombres + " " +
                                  m.DueñoNavigation.Apellidos
                })
                .ToListAsync();

            return Ok(mascotas);
        }

        [HttpGet("Listar/{nombreMascota}")]
        public async Task<IActionResult> BuscarMascota(string nombreMascota)
        {
            var mascota = await _context.Mascota
                .Include(m => m.DueñoNavigation)
                .Where(m => m.NombreMascota == nombreMascota)
                .Select(m => new MascotaResponseDto
                {
                    IdMascota = m.IdMascota,
                    NombreMascota = m.NombreMascota,
                    Especie = m.Especie,
                    Raza = m.Raza,
                    FechaNacimiento = m.FechaNacimiento ?? DateTime.MinValue,
                    DueñoNombre = m.DueñoNavigation.Nombres
                })
                .FirstOrDefaultAsync();

            if (mascota == null)
                return NotFound("Mascota no registrada.");

            return Ok(mascota);
        }

        [HttpPost("Crear")]
        public async Task<IActionResult> CrearMascota(MascotaCreateDto dto)
        {
            if (dto == null)
                return BadRequest();

            var dueñoExiste = await _context.Personas
                .AnyAsync(p => p.DocPersona == dto.Dueño);

            if (!dueñoExiste)
                return BadRequest(
                    "El dueño no está registrado.");

            var mascota = new Mascota
            {
                NombreMascota = dto.NombreMascota,
                Especie = dto.Especie,
                Raza = dto.Raza,
                FechaNacimiento = dto.FechaNacimiento,
                Dueño = dto.Dueño
            };

            _context.Mascota.Add(mascota);

            await _context.SaveChangesAsync();

            return Ok(new
            {
                mascota.IdMascota,
                mascota.NombreMascota
            });
        }

        [HttpPut("Actualizar/{IdMascota}")]
        public async Task<IActionResult> ActualizarMascota(int IdMascota, MascotaUpdateDto dto)
        {
            if (dto == null)
                return BadRequest();

            var mascota = await _context.Mascota
                .FindAsync(IdMascota);

            if (mascota == null)
                return NotFound("Mascota no encontrada.");

            mascota.NombreMascota = dto.NombreMascota;
            mascota.Especie = dto.Especie;
            mascota.Raza = dto.Raza;
            mascota.FechaNacimiento = dto.FechaNacimiento;
            mascota.Dueño = dto.Dueño;

            await _context.SaveChangesAsync();

            return Ok(new MascotaResponseDto
            {
                IdMascota = mascota.IdMascota,
                NombreMascota = mascota.NombreMascota,
                Especie = mascota.Especie,
                Raza = mascota.Raza,
                FechaNacimiento = mascota.FechaNacimiento ?? DateTime.MinValue
            });
        }

        [HttpDelete("Eliminar/{IdMascota}")]
        public async Task<IActionResult> EliminarMascota(int IdMascota)
        {
            var mascota = await _context.Mascota
                .FindAsync(IdMascota);

            if (mascota == null)
                return NotFound("Mascota no encontrada.");

            var tieneCitas = await _context.Cita
                .AnyAsync(c => c.Mascota == IdMascota);

            if (tieneCitas)
                return BadRequest("La mascota tiene citas asociadas.");

            var tieneHistoria = await _context.HistoriaClinicas
                .AnyAsync(h => h.Mascota == IdMascota);

            if (tieneHistoria)
                return BadRequest("La mascota tiene historia clínica asociada.");

            _context.Mascota.Remove(mascota);

            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
