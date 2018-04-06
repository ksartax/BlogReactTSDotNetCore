using BlogProgramistyczny.Entites;
using BlogProgramistyczny.ModelView.Profil;

namespace BlogProgramistyczny.Services.Interface
{
    public interface IProfileService : IService<Profil, ProfilView>
    {
        bool CreateOrUpdate(ProfilCreate profilCreate);
    }
}
