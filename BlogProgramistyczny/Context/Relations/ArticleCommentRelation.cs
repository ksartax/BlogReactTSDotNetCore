using BlogProgramistyczny.Entites;
using Microsoft.EntityFrameworkCore;

namespace BlogProgramistyczny.Context.Relations
{
    public static class ArticleCommentRelation
    {
        public static void SetArticleCommentRelation(this ApplicationContext applicationContext,
            ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<ArticleComment>()
                .HasKey(k => new { k.Id });

            modelBuilder.Entity<ArticleComment>()
                .HasOne(ac => ac.Article)
                .WithMany(a => a.Comments)
                .HasForeignKey(ac => ac.ArticleId);
        }
    }
}
