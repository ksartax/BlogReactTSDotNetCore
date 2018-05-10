using System.ComponentModel.DataAnnotations;

namespace Models.Entites
{
    public class ProfileOption
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "Pole nie może być puste")]
        public string Title { get; set; }
        [Required(ErrorMessage = "Pole nie może być puste")]
        public string Value { get; set; }

        public string Description { get; set; }

        [Required(ErrorMessage = "Pole nie może być puste")]
        public int ProfilId { get; set; }
        public Profil Profil { get; set; }

        public ProfileOption()
        {
        }

        public ProfileOption(int id, string title, string description, string value, int profilId, Profil profil)
        {
            Id = id;
            Title = title;
            Description = description;
            Value = value;
            ProfilId = profilId;
            Profil = profil;
        }
    }
}

