using System;
using System.Collections.Generic;

namespace VeterinariaSan.Models;

public partial class Mascota
{
    public int IdMascota { get; set; }

    public string? NombreMascota { get; set; }

    public string? Especie { get; set; }

    public string? Raza { get; set; }

    public DateTime? FechaNacimiento { get; set; }

    public int? Dueño { get; set; }

    public virtual ICollection<Cita> Cita { get; set; } = new List<Cita>();

    public virtual Persona? DueñoNavigation { get; set; }

    public virtual ICollection<HistoriaClinica> HistoriaClinicas { get; set; } = new List<HistoriaClinica>();
}
