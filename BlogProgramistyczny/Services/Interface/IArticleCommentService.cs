using BlogProgramistyczny.ModelView.ArticleComment;
using System.Collections.Generic;

namespace BlogProgramistyczny.Services.Interface
{
    public interface IArticleCommentService
    {
        bool Add(int id, ArticleCommentCreate articleCommentCreate);
        ICollection<ArticleCommentView> Get(int id);
    }
}
