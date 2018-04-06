using BlogProgramistyczny.Entites;
using Microsoft.EntityFrameworkCore;

namespace BlogProgramistyczny.Context.Relations
{
    public static class ArticleRelation
    {
        public static void SetArticleRelation(this ApplicationContext applicationContext,
            ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Article>()
                .HasKey(k => new { k.Id });
        }
    }
}
