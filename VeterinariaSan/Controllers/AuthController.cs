using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using VeterinariaSan.Data;
using VeterinariaSan.Dto;

namespace VeterinariaSan.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly VeterinariaContext _context;

        public AuthController(VeterinariaContext context)
        {
            _context = context;
        }

        [HttpPost("Login")]

        public async Task<IActionResult> Login(LoginDto loginDto)
        {
            if (loginDto == null || string.IsNullOrWhiteSpace(loginDto.Usuario) || string.IsNullOrWhiteSpace(loginDto.Password))
            {
                return BadRequest("Usuario y contraseña obligatoria");
            }

            var perrsona = await _context.Personas
                .FirstOrDefaultAsync(p => p.Usuario == loginDto.Usuario);

            if (perrsona == null || perrsona.Password != loginDto.Password)
            {
                return Unauthorized("Usuario y conrtraseña incorecta");
            }


            var roles = await _context.PersonaRols
                .Where(pr=> pr.PersonaDocPersona == perrsona.DocPersona)
                .Select(pr=> pr.RolIdRolNavigation.NombreRol)
                .ToListAsync();

            return Ok(
                new LoginResponseDto
                {
                    DocPersona = perrsona.DocPersona,
                    Nombre = perrsona.Nombres,
                    Apellidos = perrsona.Apellidos,
                    Usuario = perrsona.Usuario,
                    Email = perrsona.Email,
                    Roles = roles
                });
        }
    }
}
