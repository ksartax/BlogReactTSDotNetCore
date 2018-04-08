using BlogProgramistyczny.Helpers.Paginate;
using BlogProgramistyczny.ModelView.Profil;

namespace BlogProgramistyczny.Services.Interface
{
    public interface IProfileService
    {
        bool CreateOrUpdate(ProfilCreate profilCreate);
        PaginatedView<ProfilView> List(Parameters parameters);
    }
}
