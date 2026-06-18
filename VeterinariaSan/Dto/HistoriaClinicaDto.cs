namespace VeterinariaSan.Dto
{
    public class HistoriaClinicaCreateDto
    {
        public int Mascota { get; set; }
    }

    public class HistoriaClinicaResponseDto
    {
        public int IdHistoriaClinica { get; set; }
        public int MascotaId { get; set; }
        public string MascotaNombre { get; set; }
    }
}