using BlogProgramistyczny.Entites;
using BlogProgramistyczny.Services.Interface;
using BlogProgramistyczny.Repository.Interface;
using System.Collections.Generic;
using BlogProgramistyczny.Helpers.Paginate;
using BlogProgramistyczny.ModelView.Profil;
using System.Linq;
using System.IO;

namespace BlogProgramistyczny.Services
{
    public class ProfileService : IProfileService
    {
        private readonly IProfileRepository _profileRepository;
        private readonly IFileService _fileService;

        public ProfileService(IProfileRepository profileRepository, IFileService fileService)
        {
            _profileRepository = profileRepository;
            _fileService = fileService;
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
            string fileName = "";

            if (profil == null)
            {
                _fileService.Clear("profile");
                fileName = _fileService.Copy(profilCreate.ImgPath, "profile");
                if (fileName != null)
                {
                    profilCreate.ImgPath = fileName;
                }

                return _profileRepository.Save(new Profil(profilCreate));
            }

            if (!profilCreate.ImgPath.Equals(profil.ImgPath))
            {
                _fileService.Clear("profile");
                fileName = _fileService.Copy(profilCreate.ImgPath, "profile");
                if (fileName != null)
                {
                    profilCreate.ImgPath = fileName;
                }
            }

            return _profileRepository.Update(profil.Update(profilCreate));
        }
    }
}
