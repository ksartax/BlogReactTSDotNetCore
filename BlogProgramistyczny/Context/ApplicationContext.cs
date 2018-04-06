using BlogProgramistyczny.Context.Relations;
using BlogProgramistyczny.Entites;
using Microsoft.EntityFrameworkCore;

namespace BlogProgramistyczny.Context
{
    public class ApplicationContext : DbContext
    {
        public DbSet<Article> Articles { get; set; }
        public DbSet<ArticleComment> ArticleComments { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<Image> Images { get; set; }
        public DbSet<Profil> Profile { get; set; }

        public ApplicationContext(DbContextOptions<ApplicationContext> options) 
            : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            this.SetArticleRelation(modelBuilder);
            this.SetArticleImageRelation(modelBuilder);
            this.SetArticleCommentRelation(modelBuilder);
            this.SetArticleCategoryRelation(modelBuilder);
        }
    }
}
