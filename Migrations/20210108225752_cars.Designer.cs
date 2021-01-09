﻿// <auto-generated />
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;
using se_project;

namespace se_project.Migrations
{
    [DbContext(typeof(CompanyDBEntities))]
    [Migration("20210108225752_cars")]
    partial class cars
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .UseIdentityByDefaultColumns()
                .HasAnnotation("Relational:Collation", "en_US.UTF-8")
                .HasAnnotation("Relational:MaxIdentifierLength", 63)
                .HasAnnotation("ProductVersion", "5.0.1");

            modelBuilder.Entity("se_project.Models.Car", b =>
                {
                    b.Property<int>("LicensePlate")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .UseIdentityByDefaultColumn();

                    b.Property<string>("Model")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("OwnerUsername")
                        .HasColumnType("text");

                    b.Property<int>("Type")
                        .HasColumnType("integer");

                    b.HasKey("LicensePlate");

                    b.HasIndex("OwnerUsername");

                    b.ToTable("Cars");
                });

            modelBuilder.Entity("se_project.Models.DiagnosticProfile", b =>
                {
                    b.Property<int>("LicensePlate")
                        .HasColumnType("integer");

                    b.Property<string>("Body")
                        .HasColumnType("text");

                    b.Property<string>("Brakes")
                        .HasColumnType("text");

                    b.Property<string>("Conditionig")
                        .HasColumnType("text");

                    b.Property<string>("Engine")
                        .HasColumnType("text");

                    b.Property<string>("Lighting")
                        .HasColumnType("text");

                    b.Property<string>("LowVoltage")
                        .HasColumnType("text");

                    b.Property<List<string>>("Miscellaneous")
                        .HasColumnType("text[]");

                    b.Property<string>("Sensors")
                        .HasColumnType("text");

                    b.HasKey("LicensePlate");

                    b.ToTable("DiagnosticProfiles");
                });

            modelBuilder.Entity("se_project.Models.User", b =>
                {
                    b.Property<string>("Username")
                        .HasColumnType("text");

                    b.Property<string>("Guid")
                        .HasColumnType("text");

                    b.Property<int>("Id")
                        .HasColumnType("integer");

                    b.Property<string>("Password")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<int>("UserType")
                        .HasColumnType("integer");

                    b.HasKey("Username");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("se_project.Models.Car", b =>
                {
                    b.HasOne("se_project.Models.User", "Owner")
                        .WithMany()
                        .HasForeignKey("OwnerUsername");

                    b.Navigation("Owner");
                });

            modelBuilder.Entity("se_project.Models.DiagnosticProfile", b =>
                {
                    b.HasOne("se_project.Models.Car", "Car")
                        .WithOne("DiagnosticProfile")
                        .HasForeignKey("se_project.Models.DiagnosticProfile", "LicensePlate")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Car");
                });

            modelBuilder.Entity("se_project.Models.Car", b =>
                {
                    b.Navigation("DiagnosticProfile");
                });
#pragma warning restore 612, 618
        }
    }
}
