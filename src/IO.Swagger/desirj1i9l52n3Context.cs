using System;
using IO.Swagger.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

#nullable disable

namespace IO.Swagger
{
    public partial class desirj1i9l52n3Context : DbContext
    {
        public desirj1i9l52n3Context()
        {
        }

        public desirj1i9l52n3Context(DbContextOptions<desirj1i9l52n3Context> options)
            : base(options)
        {
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
                optionsBuilder.UseNpgsql("Server=ec2-54-247-71-245.eu-west-1.compute.amazonaws.com;Port=5432;User Id=nzsiiyxpwxqnef;Password=f62f533092bba8bc3de0a80bafb53ea3781db5b0a80629a031b062fd0dac80fa;Database=desirj1i9l52n3;SSL Mode=Require;TrustServerCertificate=True;");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasAnnotation("Relational:Collation", "en_US.UTF-8");

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
        public DbSet<Car> Cars {get; set;}
    }
}
