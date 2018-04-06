using System.Collections.Generic;

namespace BlogProgramistyczny.ModelView.Profil
{
    public class ProfilView
    {
        public string Header { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string ImgPath { get; set; }

        public virtual ICollection<ProfileOptionView> Options { get; set; }
    }
}
