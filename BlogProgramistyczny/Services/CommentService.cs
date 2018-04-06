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

        public PaginatedListMapped<ArticleCommentView> List(int pageIndex, int pageSize, string sort)
        {
            var comments = PaginatedList<Entites.ArticleComment>.Create(
                    _commentRepository.List()
                    .Where(c => c.ArticleCommentId == 0)
                    .AsQueryable(),
                    pageIndex,
                    pageSize
                );

            var commentsMapped = new List<ArticleCommentView>();
            foreach (var a in comments)
            {
                commentsMapped.Add(new ArticleCommentView(a, true));
            }

            return new PaginatedListMapped<ArticleCommentView>()
            {
                Items = commentsMapped,
                PageIndex = comments.PageIndex,
                TotalPages = comments.TotalPages
            };
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
            throw new System.NotImplementedException();
        }

        public bool Update(int id, ArticleCommentCreate value)
        {
            throw new System.NotImplementedException();
        }

        public ArticleCommentView Get(int id)
        {
            throw new System.NotImplementedException();
        }
    }
}
