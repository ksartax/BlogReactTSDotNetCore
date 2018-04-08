using System.ComponentModel.DataAnnotations;

namespace BlogProgramistyczny.ModelView.ArticleComment
{
    public class ArticleCommentUpdate
    {
        [Required]
        public string FirstName { get; set; }
        [Required]
        public string Description { get; set; }
    }
}
