using System.ComponentModel.DataAnnotations;

namespace BlogProgramistyczny.Entites
{
    public class ProfileOption
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string Title { get; set; }
        public string Description { get; set; }
        [Required]
        public string Value { get; set; }

        public int ProfilId { get; set; }
        public Profil Profil { get; set; }

        public ProfileOption(int id, string title, string description, string value, int profilId, Profil profil)
        {
            Id = id;
            Title = title;
            Description = description;
            Value = value;
            ProfilId = profilId;
            Profil = profil;
        }

        public ProfileOption()
        {
        }
    }
}

