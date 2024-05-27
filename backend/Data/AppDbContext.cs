using API.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Directory = API.Entities.Directory;
using File = API.Entities.File;

namespace API.Data
{
    public class AppDbContext : IdentityDbContext<User, IdentityRole<string>, string, IdentityUserClaim<string>, IdentityUserRole<string>, IdentityUserLogin<string>,
        IdentityRoleClaim<string>, IdentityUserToken<string>>
    {
        public DbSet<User> Users { get; set; }
        public DbSet<File> Files { get; set; }
        public DbSet<Directory> Directories { get; set; }
        public DbSet<FileData> FilesData { get; set; }
        public DbSet<UserProfileImage> ProfileImages { get; set; }
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
        }
    }
}