using System;
using System.Collections.Generic;

namespace VeterinariaSan.Models;

public partial class Persona
{
    public int DocPersona { get; set; }

    public string TipoDoc { get; set; } = null!;

    public string Nombres { get; set; } = null!;

    public string Apellidos { get; set; } = null!;

    public string? Email { get; set; }

    public string? Telefono { get; set; }

    public string Usuario { get; set; } = null!;

    public string Password { get; set; } = null!;

    public virtual ICollection<Cita> Cita { get; set; } = new List<Cita>();

    public virtual ICollection<DetalleHistoriaClinica> DetalleHistoriaClinicas { get; set; } = new List<DetalleHistoriaClinica>();

    public virtual ICollection<Mascota> Mascota { get; set; } = new List<Mascota>();

    public virtual ICollection<PersonaRol> PersonaRols { get; set; } = new List<PersonaRol>();
}
