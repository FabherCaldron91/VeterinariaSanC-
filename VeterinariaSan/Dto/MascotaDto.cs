namespace VeterinariaSan.Dto
{
    public class MascotaCreateDto
    {
        public string NombreMascota { get; set; }
        public string Especie { get; set; }
        public string Raza { get; set; }
        public DateTime FechaNacimiento { get; set; }
        public int Dueño { get; set; }
    }

    public class MascotaUpdateDto
    {
        public string NombreMascota { get; set; }
        public string Especie { get; set; }
        public string Raza { get; set; }
        public DateTime FechaNacimiento { get; set; }

        public int? Dueño { get; set; }
    }

    public class MascotaResponseDto
    {
        public int IdMascota { get; set; }
        public string NombreMascota { get; set; }
        public string Especie { get; set; }
        public string Raza { get; set; }
        public DateTime FechaNacimiento { get; set; }
        public int? Dueño { get; set; }

        public string DueñoNombre { get; set; }
    }

    public class MascotaListadoDto
    {
        public int IdMascota { get; set; }

        public string NombreMascota { get; set; }

        public string Especie { get; set; }

        public string Raza { get; set; }

        public string DueñoNombre { get; set; }
    }

    public class MascotaDetalleDto
    {
        public int IdMascota { get; set; }

        public string NombreMascota { get; set; }

        public string Especie { get; set; }

        public string Raza { get; set; }

        public DateTime FechaNacimiento { get; set; }

        public int? Dueño { get; set; }

        public string DueñoNombre { get; set; }
    }
}