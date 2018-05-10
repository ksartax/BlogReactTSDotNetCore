using System.ComponentModel.DataAnnotations;

namespace Models.ModelView.ArticleComment
{
    public class ArticleCommentUpdate
    {
        [Required]
        public string FirstName { get; set; }
        [Required]
        public string Description { get; set; }
    }
}
