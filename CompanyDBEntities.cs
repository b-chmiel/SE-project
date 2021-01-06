using se_project.Models;
using Microsoft.EntityFrameworkCore;

#nullable disable

namespace se_project
{
    public partial class CompanyDBEntities : DbContext
    {
        public CompanyDBEntities()
        {
        }

        public CompanyDBEntities(DbContextOptions<CompanyDBEntities> options)
            : base(options)
        {
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseNpgsql("Server=ec2-54-247-71-245.eu-west-1.compute.amazonaws.com;Port=5432;User Id=nzsiiyxpwxqnef;Password=f62f533092bba8bc3de0a80bafb53ea3781db5b0a80629a031b062fd0dac80fa;Database=desirj1i9l52n3;SSL Mode=Require;TrustServerCertificate=True;");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasAnnotation("Relational:Collation", "en_US.UTF-8");

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);

        public DbSet<User> Users { get; set; }
        /*public DbSet<AutoPart> AutoParts { get; set; }
        public DbSet<Car> Cars { get; set; }
        public DbSet<Client> Clients { get; set; }
        public DbSet<DiagnosticProfile> DiagnosticProfiles { get; set; }
        public DbSet<Employee> Employees { get; set; }
        public DbSet<Insurance> Insurances { get; set; }
        public DbSet<Payment> Payments { get; set; }
        public DbSet<Visit> Visits { get; set; }*/
    }
}
