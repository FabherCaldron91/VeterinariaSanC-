namespace VeterinariaSan.Dto
{
    public class ClienteDto
    {
        public int? DocPersona { get; set; }
        public string Nombre { get; set; }
        public List<MascotaResponseDto> Mascota { get; set; }
        public List<CitaResponseDto> Citas { get; set; }

    }
}
