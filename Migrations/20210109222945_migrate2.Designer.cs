﻿// <auto-generated />
using System;
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
    [Migration("20210109222945_migrate2")]
    partial class migrate2
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
                    b.Property<string>("LicensePlate")
                        .HasColumnType("text");

                    b.Property<string>("Model")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("OwnerUsername")
                        .HasColumnType("text");

                    b.Property<int>("Type")
                        .HasColumnType("integer");

                    b.Property<string>("Username")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("LicensePlate");

                    b.HasIndex("OwnerUsername");

                    b.ToTable("Cars");
                });

            modelBuilder.Entity("se_project.Models.DiagnosticProfile", b =>
                {
                    b.Property<string>("LicensePlate")
                        .HasColumnType("text");

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

            modelBuilder.Entity("se_project.Models.EmployeeVisit", b =>
                {
                    b.Property<string>("Username")
                        .HasColumnType("text");

                    b.Property<long>("VisitId")
                        .HasColumnType("bigint");

                    b.Property<string>("EmployeeUsername")
                        .HasColumnType("text");

                    b.HasKey("Username", "VisitId");

                    b.HasIndex("EmployeeUsername");

                    b.HasIndex("VisitId");

                    b.ToTable("EmployeesVisits");
                });

            modelBuilder.Entity("se_project.Models.User", b =>
                {
                    b.Property<string>("Username")
                        .HasColumnType("text");

                    b.Property<int>("Discount")
                        .HasColumnType("integer");

                    b.Property<string>("Email")
                        .HasColumnType("text");

                    b.Property<string>("Guid")
                        .HasColumnType("text");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Password")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("PhoneNumber")
                        .HasColumnType("text");

                    b.Property<string>("Surname")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<int>("UserType")
                        .HasColumnType("integer");

                    b.HasKey("Username");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("se_project.Models.Visit", b =>
                {
                    b.Property<long?>("VisitId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint")
                        .UseIdentityByDefaultColumn();

                    b.Property<string>("CarOwnerUsername")
                        .HasColumnType("text");

                    b.Property<DateTime?>("Date")
                        .IsRequired()
                        .HasColumnType("timestamp without time zone");

                    b.Property<decimal?>("Price")
                        .HasColumnType("numeric");

                    b.Property<List<string>>("RequiredActions")
                        .HasColumnType("text[]");

                    b.Property<int?>("Status")
                        .HasColumnType("integer");

                    b.HasKey("VisitId");

                    b.HasIndex("CarOwnerUsername");

                    b.ToTable("Visits");
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

            modelBuilder.Entity("se_project.Models.EmployeeVisit", b =>
                {
                    b.HasOne("se_project.Models.User", "Employee")
                        .WithMany("AssignedVisits")
                        .HasForeignKey("EmployeeUsername");

                    b.HasOne("se_project.Models.Visit", "Visit")
                        .WithMany("AssignedEmployees")
                        .HasForeignKey("VisitId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Employee");

                    b.Navigation("Visit");
                });

            modelBuilder.Entity("se_project.Models.Visit", b =>
                {
                    b.HasOne("se_project.Models.User", "CarOwner")
                        .WithMany("UserVisits")
                        .HasForeignKey("CarOwnerUsername");

                    b.Navigation("CarOwner");
                });

            modelBuilder.Entity("se_project.Models.Car", b =>
                {
                    b.Navigation("DiagnosticProfile");
                });

            modelBuilder.Entity("se_project.Models.User", b =>
                {
                    b.Navigation("AssignedVisits");

                    b.Navigation("UserVisits");
                });

            modelBuilder.Entity("se_project.Models.Visit", b =>
                {
                    b.Navigation("AssignedEmployees");
                });
#pragma warning restore 612, 618
        }
    }
}