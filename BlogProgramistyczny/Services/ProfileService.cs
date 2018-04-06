using BlogProgramistyczny.Entites;
using BlogProgramistyczny.Services.Interface;
using System;
using BlogProgramistyczny.Repository.Interface;
using System.Collections.Generic;
using BlogProgramistyczny.Helpers.Paginate;
using BlogProgramistyczny.ModelView.Profil;
using System.Linq;
using Microsoft.AspNetCore.Server.Kestrel.Internal.System.Collections.Sequences;

namespace BlogProgramistyczny.Services
{
    public class ProfileService : IProfileService
    {
        private readonly IProfileRepository _profileRepository;

        public ProfileService(IProfileRepository profileRepository)
        {
            this._profileRepository = profileRepository;
        }

        public bool Delete(int id)
        {
            throw new NotImplementedException();
        }

        public ProfilView Get(int id)
        {
            throw new NotImplementedException();
        }

        public PaginatedListMapped<ProfilView> List(int pageIndex, int pageSize, string sort)
        {
            var profiles = PaginatedList<Profil>.Create(
                    this._profileRepository.List().AsQueryable(),
                    pageIndex,
                    pageSize
                );

            var profilesMapped = new List<ProfilView>();
            profiles.Items.ForEach(a => {
                var profilesOptionMapped = new List<ProfileOptionView>();
                a.Options.ToList().ForEach(o =>
                {
                    profilesOptionMapped.Add(new ProfileOptionView()
                    {
                        Title = o.Title,
                        Description = o.Description,
                        Value = o.Value
                    });
                });

                profilesMapped.Add(new ProfilView() {
                    Description = a.Description,
                    Header = a.Header,
                    ImgPath = a.ImgPath,
                    Title = a.Title,
                    Options = profilesOptionMapped
                });
            });

            return new PaginatedListMapped<ProfilView>()
            {
                Items = profilesMapped,
                PageIndex = profiles.PageIndex,
                TotalPages = profiles.TotalPages
            };
        }

        public bool Save(Profil value)
        {
            throw new NotImplementedException();
        }

        public bool Update(int id, Profil value)
        {
            throw new NotImplementedException();
        }

        public bool CreateOrUpdate(ProfilCreate profilCreate)
        {
            var profil = this._profileRepository.List().FirstOrDefault();
            bool create = true;

            if (profil == null)
            {
                profil = new Profil();
                create = false;
            }

            profil.Description = profilCreate.Description;
            profil.Title = profilCreate.Title;
            profil.Header = profilCreate.Header;
            profil.ImgPath = profilCreate.ImgPath;

            ICollection<ProfileOption> options = new List<ProfileOption>();
            profilCreate.Options.ToList().ForEach(p => {
                options.Add(new ProfileOption() {
                    Title = p.Title,
                    Value = p.Value
                });
            });
            profil.Options = options;

            if (create)
            {
                return this._profileRepository.Update(profil);
            }

            return this._profileRepository.Save(profil);
        }
    }
}
