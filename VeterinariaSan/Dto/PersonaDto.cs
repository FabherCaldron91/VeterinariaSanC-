namespace VeterinariaSan.Dto
{
    public class PersonaCreateDto
    {
        public int DocPersona { get; set; }
        public string TipoDoc { get; set; }
        public string Nombres { get; set; }
        public string Apellidos { get; set; }
        public string Email { get; set; }
        public string Telefono { get; set; }
        public string Usuario { get; set; }
        public string Password { get; set; }
    }

    public class PersonaUpdateDto
    {
        public string TipoDoc { get; set; }
        public string Nombres { get; set; }
        public string Apellidos { get; set; }
        public string Email { get; set; }
        public string Telefono { get; set; }
        public string Usuario { get; set; }
        public string Password { get; set; }
    }

    public class PersonaResponseDto
    {
        public int DocPersona { get; set; }
        public string TipoDoc { get; set; }
        public string Nombres { get; set; }
        public string Apellidos { get; set; }
        public string Email { get; set; }
        public string Telefono { get; set; }
        public string Usuario { get; set; }
    }
}