using System;
using System.Collections.Generic;

namespace VeterinariaSan.Models;

public partial class Rol
{
    public int IdRol { get; set; }

    public string? NombreRol { get; set; }

    public virtual ICollection<PersonaRol> PersonaRols { get; set; } = new List<PersonaRol>();
}
