using BlogProgramistyczny.ModelView.Article;
using System.Collections.Generic;
using System.Linq;

namespace BlogProgramistyczny.ModelView.ArticleComment
{
    public class ArticleCommentView
    {
        public int Id { get; set; }
        public int ArticleId { get; set; }
        public string Surname { get; set; }
        public string Description { get; set; }
        public string Date { get; set; }

        public virtual ArticleView ArticleView { get; set; }

        public virtual ICollection<ArticleCommentView> ReplayComment { get; set; } = new List<ArticleCommentView>();

        public ArticleCommentView(Entites.ArticleComment articleComment, bool articleContain = false)
        {
            Id = articleComment.Id;
            Surname = articleComment.Surname;
            Description = articleComment.Description;
            Date = articleComment.CreatedAt.ToString("dd-MM-yyyy");
            ArticleId = articleComment.ArticleId;    

            if (articleContain)
            {
                ArticleView = new ArticleView(articleComment.Article);
            }

            articleComment.Comments?.ToList().ForEach(c => ReplayComment.Add(new ArticleCommentView(c)));
        }

        public ArticleCommentView()
        {
        }
    }
}
