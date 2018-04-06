using BlogProgramistyczny.Entites;
using BlogProgramistyczny.Services.Interface;
using System;
using BlogProgramistyczny.Repository.Interface;
using System.Collections.Generic;
using BlogProgramistyczny.ModelView.Article;
using System.Linq;
using BlogProgramistyczny.Helpers.Paginate;
using BlogProgramistyczny.ModelView.ArticleComment;

namespace BlogProgramistyczny.Services
{
    public class ArticleService : IArticleService
    {
        private readonly IArticleRepository _articleRepository;
        private readonly IFileService _fileService;

        public ArticleService(IArticleRepository articleRepository, IFileService fileService)
        {
            this._articleRepository = articleRepository;
            this._fileService = fileService;
        }

        public ArticleCommentView AddComment(int id, ArticleCommentCreate articleCommentCreate)
        {
            var article = _articleRepository.Get(id);

            article.Comments.Add(new ArticleComment()
            {
                Description = articleCommentCreate.Description,
                Surname = articleCommentCreate.FirstName,
                CreatedAt = DateTime.Now
            });

            if (!_articleRepository.Update(article))
            {
                return null;
            }

            var lastComment = article.Comments.Last();
            return new ArticleCommentView() {
                Date = lastComment.CreatedAt.ToString("dd-MM-yyyy"),
                Description = lastComment.Description,
                Surname = lastComment.Surname,
                Id = lastComment.Id
            };
        }

        public bool Delete(int id)
        {
            throw new NotImplementedException();
        }

        public ArticleView Get(int id)
        {
            var article = this._articleRepository.Get(id);
            if (article == null)
            {
                throw new Exception("Błąd brak artykułu");
            }

            return new ArticleView(article);
        }

        public ArticleView Get(string id)
        {
            var article = this._articleRepository.Get(id);
            if (article == null)
            {
                throw new Exception("Błąd brak artykułu");
            }

            return new ArticleView(article);
        }

        public ICollection<ArticleCommentView> GetComments(int id)
        {
            var article = this._articleRepository.Get(id);
            var comments = new List<ArticleCommentView>();

            article?.Comments?.Where(c => c.ArticleCommentId == 0).ToList().ForEach(c =>
            {
                comments.Add(new ArticleCommentView(c));
            });

            return comments;
        }

        public ArticleView GetNewArticle()
        {
            var article = this._articleRepository
                .List()
                .OrderBy(a => a.CreatedAt)
                .FirstOrDefault();
            if (article == null)
            {
                return null;
            }

            return new ArticleView(article);
        }

        public PaginatedListMapped<ArticleView> List(int pageIndex, int pageSize, string sort)
        {
            var query = this._articleRepository.List().AsQueryable();
            if (sort.Contains("desc"))
            {
                query = query.OrderByDescending(a => a.CreatedAt);
            }

            var articles = PaginatedList<Article>.Create(
                    query,
                    pageIndex,
                    pageSize
                );

            var articlesMapped = new List<ArticleView>();
            articles.Items.ForEach(a => {
                articlesMapped.Add(new ArticleView(a));
            });

            return new PaginatedListMapped<ArticleView>() {
                Items = articlesMapped,
                PageIndex = articles.PageIndex,
                TotalPages = articles.TotalPages
            };
        }

        public bool Save(ArticleCreate value)
        {
            var images = new List<ArticleImage>();
            if (value.Images.Count > 0)
            {
                var fileName = _fileService.Copy(value.Images.First().Path, value.Url.Replace(" ", "-"));
                if (fileName != null)
                {
                    var image = new ArticleImage()
                    {
                        Image = new Image()
                        {
                            Path = fileName,
                            CreatedAt = DateTime.Now
                        }
                    };

                    images.Add(image);
                }
            }

            var article = new Article()
            {
                Description = value.Description,
                Title = value.Title,
                Url = value.Url,
                CreatedAt = DateTime.Now,
                Images = images
            };

            return _articleRepository.Save(article);
        }

        public bool Update(int id, ArticleCreate value)
        {
            var articleUpdated = _articleRepository.Get(id);
            articleUpdated.Description = value.Description;
            articleUpdated.Title = value.Title;
            
            var images = new List<ArticleImage>();
            if (value.Images.Count > 0)
            {
                var fileName = _fileService.Copy(value.Images.First().Path, value.Url.Replace(" ", "-"));
                if (fileName != null)
                {
                    var image = new ArticleImage()
                    {
                        Image = new Image()
                        {
                            Path = fileName,
                            CreatedAt = DateTime.Now
                        }
                    };

                    images.Add(image);

                    articleUpdated.Images = images;
                }
            }

            return _articleRepository.Update(articleUpdated);
        }
    }
}
