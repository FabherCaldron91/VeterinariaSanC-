---drop database ModeloVeterinariaSanMartin
create database ModeloVeterinariaSanMartin
go 

use ModeloVeterinariaSanMartin
go

create table Persona(
	DocPersona INT primary key,
	TipoDoc VARCHAR(20) not null,
	Nombres VARCHAR(50) not null,
	Apellidos VARCHAR(50) not null,
	Email VARCHAR(45),
	Telefono VARCHAR(10),
	Usuario VARCHAR(45) not null,
	Password VARCHAR(45) not null,
)

create table Mascota(
	IdMascota INT primary key identity(1,1),
	NombreMascota VARCHAR(45),
	Especie VARCHAR(45),
	Raza VARCHAR(45),
	FechaNacimiento DATETIME,
	Dueño INT,
	foreign key(Dueño) references Persona(DocPersona)
)

create table Rol(
	IdRol INT primary key identity(1,1),
	NombreRol VARCHAR(45)

)

create table Persona_Rol(
	IdPersonaRol int primary key identity(1,1),
	Persona_DocPersona Int,
	Rol_IdRol INT,
	foreign key(Persona_DocPersona) references Persona(DocPersona),
	foreign key(Rol_IdRol) references Rol(IdRol)
)

create table Cita(
	IdCita INT primary key identity(1,1),
	Fecha_Hora DATETIME,
	Motivo VARCHAR(45),
	Estado VARCHAR(45),
	Mascota INT,
	Veterinario INT,
	foreign key(Veterinario) references Persona(DocPersona),
	foreign key(Mascota) references Mascota(IdMascota)
)

create table Historia_Clinica(
	IdHistoria_Clinica INT primary key identity(1,1),
	Mascota INT,
	foreign key(Mascota) references Mascota(IdMascota)
	
)

create table Detalle_Historia_Clinica(
	IdDetalle INT primary key identity(1,1),
	Fecha DATETIME,
	Diagnostico VARCHAR(45),
	Tratamiento VARCHAR(100),
	HistoriaClinica INT,
	Veterinario INT,
	Cita INT,
	foreign key(Veterinario) references Persona(DocPersona),
	foreign key(HistoriaClinica) references Historia_Clinica(IdHistoria_Clinica),
	foreign key(Cita) references Cita(IdCita)
	)

