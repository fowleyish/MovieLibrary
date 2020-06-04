using Microsoft.EntityFrameworkCore;
using WebAPISample.Models;

namespace WebAPISample.Data
{
    public class ApplicationContext : DbContext
    {
        public DbSet<Movie> Movies { get; set; }

        public ApplicationContext(DbContextOptions options)
            :base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            // Seed data - needs migration
            modelBuilder.Entity<Movie>()
              .HasData(
                 new Movie { MovieId = 1, Title = "The Departed", Genre = "Drama", Director = "Martin Scorsese", ImagePath = "theDeparted.jpg"},
                 new Movie { MovieId = 2, Title = "The Dark Knight", Genre = "Drama", Director = "Christopher Nolan", ImagePath = "dk.jpg" },
                 new Movie { MovieId = 3, Title = "Inception", Genre = "Drama", Director = "Christopher Nolan", ImagePath = "inception.jpg" },
                 new Movie { MovieId = 4, Title = "Pineapple Express", Genre = "Comedy", Director = "David Gordon Green", ImagePath = "pe.jpg"},
                 new Movie { MovieId = 5, Title = "Die Hard", Genre = "Action", Director = "John McTiernan", ImagePath = "dieHard.jpg" },
                 new Movie { MovieId = 6, Title = "Insidious", Genre = "Horror", Director = "James Wan", ImagePath = "insidious.jpg"},
                 new Movie { MovieId = 7, Title = "George of the Jungle", Genre = "Comedy", Director = "Sam Weisman", ImagePath = "gotj.jpg"},
                 new Movie { MovieId = 8, Title = "Along Came Polly", Genre = "Romance", Director = "John Hamburg", ImagePath = "acp.jpg"}
              );
        }
    }
}
