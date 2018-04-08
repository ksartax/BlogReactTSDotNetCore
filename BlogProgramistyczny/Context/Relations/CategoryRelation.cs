using BlogProgramistyczny.Entites;
using Microsoft.EntityFrameworkCore;

namespace BlogProgramistyczny.Context.Relations
{
    public static class CategoryRelation
    {
        public static void SetCategoryRelation(this ApplicationContext applicationContext,
            ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Category>()
                .HasKey(k => new { k.Id });
        }
    }
}
