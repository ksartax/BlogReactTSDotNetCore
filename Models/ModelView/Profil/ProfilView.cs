using System.Collections.Generic;
using System.Linq;

namespace Models.ModelView.Profil
{
    public class ProfilView
    {
        public string Header { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string ImgPath { get; set; }

        public virtual ICollection<ProfileOptionView> Options { get; set; } = new List<ProfileOptionView>();

        public ProfilView(Entites.Profil profil)
        {
            Description = profil.Description;
            Header = profil.Header;
            ImgPath = profil.ImgPath;
            Title = profil.Title;

            profil.Options.ToList().ForEach(o =>
            {
                Options.Add(new ProfileOptionView()
                {
                    Title = o.Title,
                    Description = o.Description,
                    Value = o.Value
                });
            });
        }
    }
}
