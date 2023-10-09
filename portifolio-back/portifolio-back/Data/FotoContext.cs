using Microsoft.EntityFrameworkCore;
using portifolio_back.Models;

namespace portifolio_back.Data
{   //Contexto de banco de dados
    public class FotoContext : DbContext
    {
        public FotoContext(DbContextOptions<FotoContext> opts)
            : base(opts)
        {

        }
        
        public DbSet<Foto> Fotos { get; set; }
    }
}
