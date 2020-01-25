using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using PlatformManagementConsole.Models; 

namespace PlatformManagementConsole.Contexts
{
    public class PmcDbContext : DbContext
    {
        public DbSet<Resolver> Resolvers { get; set; }
        public DbSet<Forms> Forms { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder options)
        {
            options.UseSqlite("Data Source=connectedDevices.db");
        }
    }
}