namespace VeterinariaSan.Dto
{
    public class CitaCreateDto
    {
        public DateTime FechaHora { get; set; }
        public string Motivo { get; set; }
        public string Estado { get; set; }
        public int Mascota { get; set; }
        public int Veterinario { get; set; }
    }

    public class CitaUpdateDto
    {
        public DateTime FechaHora { get; set; }
        public string Motivo { get; set; }
        public string Estado { get; set; }
        public int Mascota { get; set; }
        public int Veterinario { get; set; }
    }

    public class CitaResponseDto
    {
        public int IdCita { get; set; }
        public DateTime FechaHora { get; set; }
        public string Motivo { get; set; }
        public string Estado { get; set; }
        public string MascotaNombre { get; set; }
        public string VeterinarioNombre { get; set; }
    }
}