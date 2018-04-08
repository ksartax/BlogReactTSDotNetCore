using BlogProgramistyczny.Repository.Interface;
using System.Collections.Generic;
using BlogProgramistyczny.Services.Interface;
using BlogProgramistyczny.ModelView.ArticleComment;
using BlogProgramistyczny.Helpers.Paginate;
using System.Linq;
using System;

namespace BlogProgramistyczny.Services
{
    public class CommentService : ICommentService
    {
        private readonly ICommentRepository _commentRepository;

        public CommentService(ICommentRepository commentRepository)
        {
            _commentRepository = commentRepository;
        }

        public bool Delete(int id)
        {
            var comment = _commentRepository.Get(id);
            if (comment == null)
            {
                throw new Exception("Brak komentarza");
            }

            return _commentRepository.Delete(id);
        }

        public PaginatedView<ArticleCommentView> List(Parameters parameters)
        {
            var comments = _commentRepository.ListByPaginatedParameters(parameters).ToList();
            parameters.Count = _commentRepository.Count();

            var commentsMapped = new List<ArticleCommentView>();
            comments.ForEach(a => {
                commentsMapped.Add(new ArticleCommentView(a, true));
            });

            return new PaginatedView<ArticleCommentView>(commentsMapped, parameters);
        }

        public bool Replace(int id, ArticleCommentCreate articleCommentCreate)
        {
            var comment = _commentRepository.Get(id);
            if (comment == null)
            {
                throw new Exception("Brak komentarza");
            }

            return _commentRepository.Save(new Entites.ArticleComment(articleCommentCreate)
            {
                ArticleCommentId = id,
                ArticleId = comment.ArticleId
            });
        }

        public bool Save(ArticleCommentCreate value)
        {
            throw new NotImplementedException();
        }

        public bool Update(int id, ArticleCommentUpdate value)
        {
            throw new NotImplementedException();
        }

        public ArticleCommentView Get(int id)
        {
            throw new NotImplementedException();
        }
    }
}
