using BlogProgramistyczny.Entites;
using BlogProgramistyczny.ModelView.ArticleComment;

namespace BlogProgramistyczny.Services.Interface
{
    public interface ICommentService : IService<ArticleCommentCreate, ArticleCommentView>
    {
        bool Replace(int id, ArticleCommentCreate articleCommentCreate);
    }
}
