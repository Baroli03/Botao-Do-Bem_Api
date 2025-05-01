using Microsoft.EntityFrameworkCore;

namespace BotaoDoBemApi
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) {}

        public DbSet<Emocao> emocoes => Set<Emocao>();
    }
}