using System;
using System.Collections.Generic;

namespace VeterinariaSan.Models;

public partial class PersonaRol
{
    public int IdPersonaRol { get; set; }

    public int? PersonaDocPersona { get; set; }

    public int? RolIdRol { get; set; }

    public virtual Persona? PersonaDocPersonaNavigation { get; set; }

    public virtual Rol? RolIdRolNavigation { get; set; }
}
