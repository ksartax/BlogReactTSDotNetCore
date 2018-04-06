using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace BlogProgramistyczny.Entites
{
    public class Profil
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string Header { get; set; }
        public string Title { get; set; }
        [Required]
        public string Description { get; set; }
        public string ImgPath { get; set; }

        public virtual ICollection<ProfileOption> Options { get; set; }

        public Profil(int id, string header, string title, string description, string imgPath, ICollection<ProfileOption> options)
        {
            Id = id;
            Header = header;
            Title = title;
            Description = description;
            ImgPath = imgPath;
            Options = options;
        }

        public Profil()
        {
        }
    }
}
