using BlogProgramistyczny.Entites;
using BlogProgramistyczny.Services.Interface;
using BlogProgramistyczny.Repository.Interface;
using System.Collections.Generic;
using BlogProgramistyczny.Helpers.Paginate;
using BlogProgramistyczny.ModelView.Profil;
using System.Linq;

namespace BlogProgramistyczny.Services
{
    public class ProfileService : IProfileService
    {
        private readonly IProfileRepository _profileRepository;

        public ProfileService(IProfileRepository profileRepository)
        {
            _profileRepository = profileRepository;
        }

        public PaginatedView<ProfilView> List(Parameters parameters)
        {
            var profiles = _profileRepository.ListByPaginatedParameters(parameters).ToList();
            parameters.Count = _profileRepository.Count();

            var profilesMapped = new List<ProfilView>();
            profiles.ForEach(a => {
                profilesMapped.Add(new ProfilView(a));
            });

            return new PaginatedView<ProfilView>(profilesMapped, parameters);
        }

        public bool CreateOrUpdate(ProfilCreate profilCreate)
        {
            var profil = _profileRepository.List().FirstOrDefault();
            if (profil == null)
            {
                return _profileRepository.Save(new Profil(profilCreate));
            }

            return _profileRepository.Update(profil.Update(profilCreate));
        }
    }
}
