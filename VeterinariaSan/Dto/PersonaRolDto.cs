namespace VeterinariaSan.Dto
{
    public class PersonaRolCreateDto
    {
        public int PersonaDocPersona { get; set; }
        public int RolIdRol { get; set; }
    }

    public class PersonaRolResponseDto
    {
        public int? IdPersonaRol { get; set; }
        public int? PersonaDocPersona { get; set; }
        public string PersonaNombre { get; set; }
        public int? RolIdRol { get; set; }   
        public string RolNombre { get; set; }
    }
}