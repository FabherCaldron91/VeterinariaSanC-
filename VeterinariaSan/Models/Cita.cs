using System;
using System.Collections.Generic;

namespace VeterinariaSan.Models;

public partial class Cita
{
    public int IdCita { get; set; }

    public DateTime? FechaHora { get; set; }

    public string? Motivo { get; set; }

    public string? Estado { get; set; }

    public int? Mascota { get; set; }

    public int? Veterinario { get; set; }

    public virtual ICollection<DetalleHistoriaClinica> DetalleHistoriaClinicas { get; set; } = new List<DetalleHistoriaClinica>();

    public virtual Mascota? MascotaNavigation { get; set; }

    public virtual Persona? VeterinarioNavigation { get; set; }
}
