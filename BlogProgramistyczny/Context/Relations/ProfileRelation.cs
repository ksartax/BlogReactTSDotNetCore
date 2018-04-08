using BlogProgramistyczny.Entites;
using Microsoft.EntityFrameworkCore;

namespace BlogProgramistyczny.Context.Relations
{
    public static class ProfileRelation
    {
        public static void SetProfileRelation(this ApplicationContext applicationContext,
            ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Profil>()
                .HasKey(k => new { k.Id });
        }
    }
}
