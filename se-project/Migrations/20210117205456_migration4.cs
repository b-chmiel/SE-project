using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

namespace se_project.Migrations
{
    public partial class migration4 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    Username = table.Column<string>(type: "text", nullable: false),
                    Guid = table.Column<string>(type: "text", nullable: true),
                    Password = table.Column<string>(type: "text", nullable: false),
                    UserType = table.Column<int>(type: "integer", nullable: false),
                    Name = table.Column<string>(type: "text", nullable: false),
                    Surname = table.Column<string>(type: "text", nullable: false),
                    PhoneNumber = table.Column<string>(type: "text", nullable: true),
                    Email = table.Column<string>(type: "text", nullable: true),
                    Discount = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.Username);
                });

            migrationBuilder.CreateTable(
                name: "Cars",
                columns: table => new
                {
                    LicensePlate = table.Column<string>(type: "text", nullable: false),
                    Model = table.Column<string>(type: "text", nullable: false),
                    Type = table.Column<int>(type: "integer", nullable: false),
                    Username = table.Column<string>(type: "text", nullable: true),
                    OwnerUsername = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Cars", x => x.LicensePlate);
                    table.ForeignKey(
                        name: "FK_Cars_Users_OwnerUsername",
                        column: x => x.OwnerUsername,
                        principalTable: "Users",
                        principalColumn: "Username",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "DiagnosticProfiles",
                columns: table => new
                {
                    LicensePlate = table.Column<string>(type: "text", nullable: false),
                    Engine = table.Column<string>(type: "text", nullable: true),
                    Body = table.Column<string>(type: "text", nullable: true),
                    LowVoltage = table.Column<string>(type: "text", nullable: true),
                    Lighting = table.Column<string>(type: "text", nullable: true),
                    Brakes = table.Column<string>(type: "text", nullable: true),
                    Sensors = table.Column<string>(type: "text", nullable: true),
                    Miscellaneous = table.Column<List<string>>(type: "text[]", nullable: true),
                    Conditioning = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DiagnosticProfiles", x => x.LicensePlate);
                    table.ForeignKey(
                        name: "FK_DiagnosticProfiles_Cars_LicensePlate",
                        column: x => x.LicensePlate,
                        principalTable: "Cars",
                        principalColumn: "LicensePlate",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Visits",
                columns: table => new
                {
                    VisitId = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Date = table.Column<DateTime>(type: "timestamp without time zone", nullable: false),
                    Price = table.Column<decimal>(type: "numeric", nullable: true),
                    RequiredActions = table.Column<List<string>>(type: "text[]", nullable: true),
                    LicensePlate = table.Column<string>(type: "text", nullable: false),
                    CarLicensePlate = table.Column<string>(type: "text", nullable: true),
                    Status = table.Column<int>(type: "integer", nullable: true),
                    Priority = table.Column<int>(type: "integer", nullable: false),
                    Type = table.Column<int>(type: "integer", nullable: false),
                    CarOwnerUsername = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Visits", x => x.VisitId);
                    table.ForeignKey(
                        name: "FK_Visits_Cars_CarLicensePlate",
                        column: x => x.CarLicensePlate,
                        principalTable: "Cars",
                        principalColumn: "LicensePlate",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Visits_Users_CarOwnerUsername",
                        column: x => x.CarOwnerUsername,
                        principalTable: "Users",
                        principalColumn: "Username",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "EmployeesVisits",
                columns: table => new
                {
                    Username = table.Column<string>(type: "text", nullable: false),
                    VisitId = table.Column<long>(type: "bigint", nullable: false),
                    VisitId1 = table.Column<int>(type: "integer", nullable: true),
                    EmployeeUsername = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EmployeesVisits", x => new { x.Username, x.VisitId });
                    table.ForeignKey(
                        name: "FK_EmployeesVisits_Users_EmployeeUsername",
                        column: x => x.EmployeeUsername,
                        principalTable: "Users",
                        principalColumn: "Username",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_EmployeesVisits_Visits_VisitId1",
                        column: x => x.VisitId1,
                        principalTable: "Visits",
                        principalColumn: "VisitId",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Cars_OwnerUsername",
                table: "Cars",
                column: "OwnerUsername");

            migrationBuilder.CreateIndex(
                name: "IX_EmployeesVisits_EmployeeUsername",
                table: "EmployeesVisits",
                column: "EmployeeUsername");

            migrationBuilder.CreateIndex(
                name: "IX_EmployeesVisits_VisitId1",
                table: "EmployeesVisits",
                column: "VisitId1");

            migrationBuilder.CreateIndex(
                name: "IX_Visits_CarLicensePlate",
                table: "Visits",
                column: "CarLicensePlate");

            migrationBuilder.CreateIndex(
                name: "IX_Visits_CarOwnerUsername",
                table: "Visits",
                column: "CarOwnerUsername");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "DiagnosticProfiles");

            migrationBuilder.DropTable(
                name: "EmployeesVisits");

            migrationBuilder.DropTable(
                name: "Visits");

            migrationBuilder.DropTable(
                name: "Cars");

            migrationBuilder.DropTable(
                name: "Users");
        }
    }
}
