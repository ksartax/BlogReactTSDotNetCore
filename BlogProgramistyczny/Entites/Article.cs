using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BlogProgramistyczny.Entites
{
    public class Article
    {
        public int Id { get; set; }

        [Required]
        public string Title { get; set; }
        [Required]
        public string Description { get; set; }
        [Required]
        public string Url { get; set; }

        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public DateTime CreatedAt { get; set; }

        public virtual ICollection<ArticleCategory> Categories { get; set; }
        public virtual ICollection<ArticleComment> Comments { get; set; }
        public virtual ICollection<ArticleImage> Images { get; set; }
    }
}
