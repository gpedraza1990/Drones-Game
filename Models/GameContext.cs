using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace React.Models
{
    public partial class GameContext : DbContext
    {
        public GameContext()
        {
        }

        public GameContext(DbContextOptions<GameContext> options)
            : base(options)
        {
        }

        public virtual DbSet<HistoricoJugadas> HistoricoJugadas { get; set; }
        public virtual DbSet<Juegosganados> Juegosganados { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseSqlServer("Server=DESKTOP-C0CTO6H;Database=Game;Integrated Security=True;");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<HistoricoJugadas>(entity =>
            {
                entity.HasKey(e => e.Hjuuni)
                    .HasName("PK__HISTORIC__843146317CC5C4E1");

                entity.ToTable("HISTORICO_JUGADAS");

                entity.Property(e => e.Hjuuni).HasColumnName("HJUUNI");

                entity.Property(e => e.Hjujni).HasColumnName("HJUJNI");

                entity.Property(e => e.Hjujuc)
                    .IsRequired()
                    .HasColumnName("HJUJUC")
                    .HasMaxLength(1)
                    .IsUnicode(false)
                    .IsFixedLength()
                    .HasDefaultValueSql("('')");

                entity.Property(e => e.Hjujuh)
                    .IsRequired()
                    .HasColumnName("HJUJUH")
                    .HasMaxLength(1)
                    .IsUnicode(false)
                    .IsFixedLength()
                    .HasDefaultValueSql("('')");

                entity.Property(e => e.Hjursl)
                    .IsRequired()
                    .HasColumnName("HJURSL")
                    .HasMaxLength(1)
                    .IsUnicode(false)
                    .IsFixedLength()
                    .HasDefaultValueSql("('')");

                entity.Property(e => e.Hjuusp)
                    .IsRequired()
                    .HasColumnName("HJUUSP")
                    .HasMaxLength(10)
                    .HasDefaultValueSql("('')");

                entity.Property(e => e.Hjuuss)
                    .IsRequired()
                    .HasColumnName("HJUUSS")
                    .HasMaxLength(10)
                    .HasDefaultValueSql("('')");
            });

            modelBuilder.Entity<Juegosganados>(entity =>
            {
                entity.HasKey(e => e.Jgnuni)
                    .HasName("PK__JUEGOSGA__0605D2AA37C94EB5");

                entity.ToTable("JUEGOSGANADOS");

                entity.Property(e => e.Jgnuni).HasColumnName("JGNUNI");

                entity.Property(e => e.Jgnusr)
                    .IsRequired()
                    .HasColumnName("JGNUSR")
                    .HasMaxLength(10)
                    .HasDefaultValueSql("('')");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
