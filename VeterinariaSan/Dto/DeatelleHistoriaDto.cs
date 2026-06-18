namespace VeterinariaSan.Dto
{
    public class DetalleHistoriaClinicaCreateDto
    {
        public DateTime Fecha { get; set; }
        public string Diagnostico { get; set; }
        public string Tratamiento { get; set; }
        public int HistoriaClinica { get; set; }
        public int Veterinario { get; set; }
        public int Cita { get; set; }
    }

    public class DetalleHistoriaClinicaUpdateDto
    {
        public DateTime Fecha { get; set; }
        public string Diagnostico { get; set; }
        public string Tratamiento { get; set; }
    }

    public class DetalleHistoriaClinicaResponseDto
    {
        public int IdDetalle { get; set; }
        public DateTime Fecha { get; set; }
        public string Diagnostico { get; set; }
        public string Tratamiento { get; set; }
        public string VeterinarioNombre { get; set; }
        public string MascotaNombre { get; set; }
    }
}