using BlogProgramistyczny.Entites;
using Microsoft.EntityFrameworkCore;

namespace BlogProgramistyczny.Context.Relations
{
    public static class ProfileOptionRelation
    {
        public static void SetProfileOptionRelation(this ApplicationContext applicationContext,
            ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<ProfileOption>()
                .HasKey(k => new { k.Id });
        }
    }
}
