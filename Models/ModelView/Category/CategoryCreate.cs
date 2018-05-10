using System.ComponentModel.DataAnnotations;

namespace Models.ModelView.Category
{
    public class CategoryCreate
    {
        [Required(ErrorMessage = "Pole nie może być puste")]
        public string Title { get; set; }
        public string Description { get; set; }
        public string UrlTitle { get; set; }
    }
}
