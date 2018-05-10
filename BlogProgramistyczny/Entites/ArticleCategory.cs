using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BlogProgramistyczny.Entites
{
    public class ArticleCategory
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        public int ArticleId { get; set; }
        public Article Article { get; set; }

        public int CategoryId { get; set; }
        public Category Category { get; set; }
    }
}
