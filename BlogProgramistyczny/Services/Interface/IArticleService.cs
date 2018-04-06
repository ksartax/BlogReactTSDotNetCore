using BlogProgramistyczny.Entites;
using BlogProgramistyczny.ModelView.Article;
using BlogProgramistyczny.ModelView.ArticleComment;
using System.Collections.Generic;

namespace BlogProgramistyczny.Services.Interface
{
    public interface IArticleService : IService<ArticleCreate, ArticleView>
    {
        ArticleView GetNewArticle();
        ArticleView Get(string id);
        ArticleCommentView AddComment(int id, ArticleCommentCreate articleCommentCreate);
        ICollection<ArticleCommentView> GetComments(int id);
    }
}
