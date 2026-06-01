using System;
using System.Collections.Generic;

namespace VeterinariaSan.Models;

public partial class DetalleHistoriaClinica
{
    public int IdDetalle { get; set; }

    public DateTime? Fecha { get; set; }

    public string? Diagnostico { get; set; }

    public string? Tratamiento { get; set; }

    public int? HistoriaClinica { get; set; }

    public int? Veterinario { get; set; }

    public int? Cita { get; set; }

    public virtual Cita? CitaNavigation { get; set; }

    public virtual HistoriaClinica? HistoriaClinicaNavigation { get; set; }

    public virtual Persona? VeterinarioNavigation { get; set; }
}
