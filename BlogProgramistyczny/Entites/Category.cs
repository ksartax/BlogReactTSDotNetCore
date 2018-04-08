using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BlogProgramistyczny.Entites
{
    public class Category
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "Pole nie może być puste")]
        public int Status { get; set; }
        [Required(ErrorMessage = "Pole nie może być puste")]
        public int Level { get; set; }
        [Required(ErrorMessage = "Pole nie może być puste")]
        public string Title { get; set; }

        public string Description { get; set; }

        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public DateTime CreatedAt { get; set; }

        public virtual ICollection<ArticleCategory> Articles { get; set; }
    }
}