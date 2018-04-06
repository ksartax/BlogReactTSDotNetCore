using BlogProgramistyczny.Entites;
using Microsoft.EntityFrameworkCore;

namespace BlogProgramistyczny.Context.Relations
{
    public static class ArticleImageRelation
    {
        public static void SetArticleImageRelation(this ApplicationContext applicationContext,
            ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<ArticleImage>()
                .HasKey(k => new { k.ArticleId, k.ImageId });

            modelBuilder.Entity<ArticleImage>()
                .HasOne(ai => ai.Article)
                .WithMany(a => a.Images)
                .HasForeignKey(ai => ai.ArticleId);

            modelBuilder.Entity<ArticleImage>()
                .HasOne(ai => ai.Image)
                .WithMany(i => i.Articles)
                .HasForeignKey(ai => ai.ImageId);
        }
    }
}
