using BlogProgramistyczny.Entites;
using Microsoft.EntityFrameworkCore;

namespace BlogProgramistyczny.Context.Relations
{
    public static class ArticleCategoryRelation
    {
        public static void SetArticleCategoryRelation(this ApplicationContext applicationContext, 
            ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<ArticleCategory>()
                .HasKey(t => new { t.ArticleId, t.CategoryId });

            modelBuilder.Entity<ArticleCategory>()
                .HasOne(ac => ac.Article)
                .WithMany(a => a.Categories)
                .HasForeignKey(ac => ac.ArticleId);

            modelBuilder.Entity<ArticleCategory>()
                .HasOne(ac => ac.Category)
                .WithMany(c => c.Articles)
                .HasForeignKey(ac => ac.CategoryId);
        }
    }
}
