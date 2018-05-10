using Models.ModelView.Profil;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;

namespace Models.Entites
{
    public class Profil
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "Pole nie może być puste")]
        public string Header { get; set; }
        [Required(ErrorMessage = "Pole nie może być puste")]
        public string Description { get; set; }

        public string Title { get; set; }
        public string ImgPath { get; set; }

        public virtual ICollection<ProfileOption> Options { get; set; } = new List<ProfileOption>();

        public Profil()
        {
        }

        public Profil(ProfilCreate profilCreate)
        {
            Description = profilCreate.Description;
            Title = profilCreate.Title;
            Header = profilCreate.Header;
            ImgPath = profilCreate.ImgPath;

            profilCreate.Options.ToList().ForEach(p => {
                Options.Add(new ProfileOption()
                {
                    Title = p.Title,
                    Value = p.Value
                });
            });
        }

        public Profil Update(ProfilCreate profilCreate)
        {
            Description = profilCreate.Description;
            Title = profilCreate.Title;
            Header = profilCreate.Header;
            ImgPath = profilCreate.ImgPath;

            Options.Clear();
            profilCreate.Options.ToList().ForEach(p => {
                Options.Add(new ProfileOption()
                {
                    Title = p.Title,
                    Value = p.Value
                });
            });

            return this;
        }

        public Profil(int id, string header, string title, string description, string imgPath, ICollection<ProfileOption> options)
        {
            Id = id;
            Header = header;
            Title = title;
            Description = description;
            ImgPath = imgPath;
            Options = options;
        }
    }
}
