using Microsoft.EntityFrameworkCore;
using LicitacoesAPI.Licitacoes; // ou o namespace correto da classe Licitacao

namespace LicitacoesAPI.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        public DbSet<Licitacao> Licitacoes { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Licitacao>()
                .HasIndex(l => l.NumeroLicitacao)
                .IsUnique();

            base.OnModelCreating(modelBuilder);
        }
    }
}
