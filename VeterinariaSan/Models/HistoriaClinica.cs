using System;
using System.Collections.Generic;

namespace VeterinariaSan.Models;

public partial class HistoriaClinica
{
    public int IdHistoriaClinica { get; set; }

    public int? Mascota { get; set; }

    public virtual ICollection<DetalleHistoriaClinica> DetalleHistoriaClinicas { get; set; } = new List<DetalleHistoriaClinica>();

    public virtual Mascota? MascotaNavigation { get; set; }
}
