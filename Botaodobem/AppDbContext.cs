using Microsoft.EntityFrameworkCore;

namespace Botaodobem;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<Emocao> Emocao { get; set; }
}
