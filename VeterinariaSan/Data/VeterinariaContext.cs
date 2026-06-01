using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using VeterinariaSan.Models;

namespace VeterinariaSan.Data;

public partial class VeterinariaContext : DbContext
{
    public VeterinariaContext()
    {
    }

    public VeterinariaContext(DbContextOptions<VeterinariaContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Cita> Cita { get; set; }

    public virtual DbSet<DetalleHistoriaClinica> DetalleHistoriaClinicas { get; set; }

    public virtual DbSet<HistoriaClinica> HistoriaClinicas { get; set; }

    public virtual DbSet<Mascota> Mascota { get; set; }

    public virtual DbSet<Persona> Personas { get; set; }

    public virtual DbSet<PersonaRol> PersonaRols { get; set; }

    public virtual DbSet<Rol> Rols { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer("Server=DESKTOP-RREDH95\\MSSQLSERVER01;Database=ModeloVeterinariaSanMartin;Trusted_Connection=True;TrustServerCertificate=True;");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Cita>(entity =>
        {
            entity.HasKey(e => e.IdCita).HasName("PK__Cita__394B02023C494AB4");

            entity.Property(e => e.Estado)
                .HasMaxLength(45)
                .IsUnicode(false);
            entity.Property(e => e.FechaHora)
                .HasColumnType("datetime")
                .HasColumnName("Fecha_Hora");
            entity.Property(e => e.Motivo)
                .HasMaxLength(45)
                .IsUnicode(false);

            entity.HasOne(d => d.MascotaNavigation).WithMany(p => p.Cita)
                .HasForeignKey(d => d.Mascota)
                .HasConstraintName("FK__Cita__Mascota__4316F928");

            entity.HasOne(d => d.VeterinarioNavigation).WithMany(p => p.Cita)
                .HasForeignKey(d => d.Veterinario)
                .HasConstraintName("FK__Cita__Veterinari__4222D4EF");
        });

        modelBuilder.Entity<DetalleHistoriaClinica>(entity =>
        {
            entity.HasKey(e => e.IdDetalle).HasName("PK__Detalle___E43646A50013266E");

            entity.ToTable("Detalle_Historia_Clinica");

            entity.Property(e => e.Diagnostico)
                .HasMaxLength(45)
                .IsUnicode(false);
            entity.Property(e => e.Fecha).HasColumnType("datetime");
            entity.Property(e => e.Tratamiento)
                .HasMaxLength(100)
                .IsUnicode(false);

            entity.HasOne(d => d.CitaNavigation).WithMany(p => p.DetalleHistoriaClinicas)
                .HasForeignKey(d => d.Cita)
                .HasConstraintName("FK__Detalle_Hi__Cita__4AB81AF0");

            entity.HasOne(d => d.HistoriaClinicaNavigation).WithMany(p => p.DetalleHistoriaClinicas)
                .HasForeignKey(d => d.HistoriaClinica)
                .HasConstraintName("FK__Detalle_H__Histo__49C3F6B7");

            entity.HasOne(d => d.VeterinarioNavigation).WithMany(p => p.DetalleHistoriaClinicas)
                .HasForeignKey(d => d.Veterinario)
                .HasConstraintName("FK__Detalle_H__Veter__48CFD27E");
        });

        modelBuilder.Entity<HistoriaClinica>(entity =>
        {
            entity.HasKey(e => e.IdHistoriaClinica).HasName("PK__Historia__F44FD72AAB2333BA");

            entity.ToTable("Historia_Clinica");

            entity.Property(e => e.IdHistoriaClinica).HasColumnName("IdHistoria_Clinica");

            entity.HasOne(d => d.MascotaNavigation).WithMany(p => p.HistoriaClinicas)
                .HasForeignKey(d => d.Mascota)
                .HasConstraintName("FK__Historia___Masco__45F365D3");
        });

        modelBuilder.Entity<Mascota>(entity =>
        {
            entity.HasKey(e => e.IdMascota).HasName("PK__Mascota__5C9C26F07A48B7DE");

            entity.Property(e => e.Especie)
                .HasMaxLength(45)
                .IsUnicode(false);
            entity.Property(e => e.FechaNacimiento).HasColumnType("datetime");
            entity.Property(e => e.NombreMascota)
                .HasMaxLength(45)
                .IsUnicode(false);
            entity.Property(e => e.Raza)
                .HasMaxLength(45)
                .IsUnicode(false);

            entity.HasOne(d => d.DueñoNavigation).WithMany(p => p.Mascota)
                .HasForeignKey(d => d.Dueño)
                .HasConstraintName("FK__Mascota__Dueño__398D8EEE");
        });

        modelBuilder.Entity<Persona>(entity =>
        {
            entity.HasKey(e => e.DocPersona).HasName("PK__Persona__139D1D1F5904DBBF");

            entity.ToTable("Persona");

            entity.Property(e => e.DocPersona).ValueGeneratedNever();
            entity.Property(e => e.Apellidos)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.Email)
                .HasMaxLength(45)
                .IsUnicode(false);
            entity.Property(e => e.Nombres)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.Password)
                .HasMaxLength(45)
                .IsUnicode(false);
            entity.Property(e => e.Telefono)
                .HasMaxLength(10)
                .IsUnicode(false);
            entity.Property(e => e.TipoDoc)
                .HasMaxLength(20)
                .IsUnicode(false);
            entity.Property(e => e.Usuario)
                .HasMaxLength(45)
                .IsUnicode(false);
        });

        modelBuilder.Entity<PersonaRol>(entity =>
        {
            entity.HasKey(e => e.IdPersonaRol).HasName("PK__Persona___40FF3314B03F65C0");

            entity.ToTable("Persona_Rol");

            entity.Property(e => e.PersonaDocPersona).HasColumnName("Persona_DocPersona");
            entity.Property(e => e.RolIdRol).HasColumnName("Rol_IdRol");

            entity.HasOne(d => d.PersonaDocPersonaNavigation).WithMany(p => p.PersonaRols)
                .HasForeignKey(d => d.PersonaDocPersona)
                .HasConstraintName("FK__Persona_R__Perso__3E52440B");

            entity.HasOne(d => d.RolIdRolNavigation).WithMany(p => p.PersonaRols)
                .HasForeignKey(d => d.RolIdRol)
                .HasConstraintName("FK__Persona_R__Rol_I__3F466844");
        });

        modelBuilder.Entity<Rol>(entity =>
        {
            entity.HasKey(e => e.IdRol).HasName("PK__Rol__2A49584CF27CF0BF");

            entity.ToTable("Rol");

            entity.Property(e => e.NombreRol)
                .HasMaxLength(45)
                .IsUnicode(false);
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
