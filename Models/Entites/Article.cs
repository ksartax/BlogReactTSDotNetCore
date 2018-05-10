using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Models.Entites
{
    public class Article
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "Pole nie może być puste")]
        public string Title { get; set; }
        [Required(ErrorMessage = "Pole nie może być puste")]
        public string Description { get; set; }
        [Required(ErrorMessage = "Pole nie może być puste")]
        public string Url { get; set; }

        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public DateTime CreatedAt { get; set; }

        public virtual ICollection<ArticleCategory> Categories { get; set; } = new List<ArticleCategory>();
        public virtual ICollection<ArticleComment> Comments { get; set; }
        public virtual ICollection<ArticleImage> Images { get; set; } = new List<ArticleImage>();
    }
}
