using BlogProgramistyczny.Entites;
using BlogProgramistyczny.ModelView.ArticleComment;

namespace BlogProgramistyczny.Services.Interface
{
    public interface ICommentService : IService<ArticleCommentView, ArticleCommentCreate, ArticleCommentUpdate>
    {
        bool Replace(int id, ArticleCommentCreate articleCommentCreate);
    }
}
