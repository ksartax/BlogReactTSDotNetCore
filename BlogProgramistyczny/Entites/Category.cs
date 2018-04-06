using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BlogProgramistyczny.Entites
{
    public class Category
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public int Status { get; set; }
        [Required]
        public int Level { get; set; }
        [Required]
        public string Title { get; set; }
        public string Description { get; set; }

        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public DateTime CreatedAt { get; set; }
        [DatabaseGenerated(DatabaseGeneratedOption.Computed)]
        public DateTime ModifiedAt { get; set; }

        public virtual ICollection<ArticleCategory> Articles { get; set; }
    }
}