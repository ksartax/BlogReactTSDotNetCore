using System.Collections.Generic;

namespace BlogProgramistyczny.ModelView.Profil
{
    public class ProfilUpdate
    {
        public string Header { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string ImgPath { get; set; }

        public virtual ICollection<ProfileOptionCreate> Options { get; set; }
    }
}
