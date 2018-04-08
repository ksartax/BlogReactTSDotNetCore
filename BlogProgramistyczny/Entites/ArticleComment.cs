using BlogProgramistyczny.ModelView.ArticleComment;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BlogProgramistyczny.Entites
{
    public class ArticleComment
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "Pole nie może być puste")]
        public string Surname { get; set; }
        [Required(ErrorMessage = "Pole nie może być puste")]
        public string Description { get; set; }

        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public DateTime CreatedAt { get; set; }

        [Required(ErrorMessage = "Pole nie może być puste")]
        public int ArticleId { get; set; }
        public virtual Article Article { get; set; }

        public int ArticleCommentId { get; set; }
        public virtual ICollection<ArticleComment> Comments { get; set; }

        public ArticleComment() { }

        public ArticleComment(ArticleCommentCreate articleCommentCreate)
        {
            Surname = articleCommentCreate.FirstName;
            Description = articleCommentCreate.Description;
            CreatedAt = DateTime.Now;
        }
    }
}
