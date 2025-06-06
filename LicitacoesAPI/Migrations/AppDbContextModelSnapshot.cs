﻿// <auto-generated />
using System;
using LicitacoesAPI.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace LicitacoesAPI.Migrations
{
    [DbContext(typeof(AppDbContext))]
    partial class AppDbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "8.0.13")
                .HasAnnotation("Relational:MaxIdentifierLength", 64);

            MySqlModelBuilderExtensions.AutoIncrementColumns(modelBuilder);

            modelBuilder.Entity("LicitacoesAPI.Licitacoes.Licitacao", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("char(36)");

                    b.Property<string>("CodigoComprador")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<DateTime>("DataHoraAberturaProcesso")
                        .HasColumnType("datetime(6)");

                    b.Property<DateTime>("DataHoraCadastro")
                        .HasColumnType("datetime(6)");

                    b.Property<DateTime>("DataHoraFimPropostas")
                        .HasColumnType("datetime(6)");

                    b.Property<DateTime>("DataHoraInicioPropostas")
                        .HasColumnType("datetime(6)");

                    b.Property<string>("NumeroLicitacao")
                        .IsRequired()
                        .HasColumnType("varchar(255)");

                    b.Property<string>("Observacoes")
                        .HasColumnType("longtext");

                    b.Property<string>("Resumo")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.HasKey("Id");

                    b.HasIndex("NumeroLicitacao")
                        .IsUnique();

                    b.ToTable("Licitacoes");
                });
#pragma warning restore 612, 618
        }
    }
}
