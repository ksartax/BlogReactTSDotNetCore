using BlogProgramistyczny.Entites;
using BlogProgramistyczny.Services.Interface;
using System;
using BlogProgramistyczny.Repository.Interface;
using System.Collections.Generic;
using BlogProgramistyczny.ModelView.Article;
using System.Linq;
using BlogProgramistyczny.Helpers.Paginate;

namespace BlogProgramistyczny.Services
{
    public class ArticleService : IArticleService
    {
        private readonly IArticleRepository _articleRepository;
        private readonly IFileService _fileService;

        public ArticleService(IArticleRepository articleRepository, IFileService fileService)
        {
            _articleRepository = articleRepository;
            _fileService = fileService;
        }

        public bool Delete(int id)
        {
            throw new NotImplementedException();
        }

        public ArticleView Get(int id)
        {
            var article = _articleRepository.Get(id);
            if (article == null)
            {
                throw new Exception("Błąd brak artykułu");
            }

            return new ArticleView(article);
        }

        public ArticleView GetByUrl(string url)
        {
            var article = _articleRepository.GetByUrl(url);
            if (article == null)
            {
                throw new Exception("Błąd brak artykułu");
            }

            return new ArticleView(article);
        }

        public ArticleView GetNewArticle()
        {
            var article = _articleRepository.GetFirst();
            if (article == null)
            {
                throw new Exception("Wystąpił błąd z pobieranie artykułu");
            }

            return new ArticleView(article);
        }

        public PaginatedView<ArticleView> List(Parameters parameters)
        {
            var articles = _articleRepository.ListByPaginatedParameters(parameters).ToList();
            parameters.Count = _articleRepository.Count(parameters);

            var articlesMapped = new List<ArticleView>();
            articles.ForEach(a => {
                articlesMapped.Add(new ArticleView(a));
            });

            return new PaginatedView<ArticleView>(articlesMapped, parameters);
        }

        public bool Save(ArticleCreate value)
        {
            var images = new List<ArticleImage>();
            if (value.Images.Count > 0)
            {
                var destination = value.Url.Replace(" ", "-");
                foreach (var item in value.Images)
                {
                    var fileName = _fileService.Copy(item.Path, destination);
                    if (fileName == null)
                    {
                        continue;
                    }

                    images.Add(new ArticleImage()
                    {
                        Image = new Image()
                        {
                            Path = fileName,
                            CreatedAt = DateTime.Now
                        }
                    });
                }
            }

            var catehories = new List<ArticleCategory>();
            foreach (var item in value.Categories)
            {
                catehories.Add(new ArticleCategory() {
                    CategoryId = item
                });
            }

            var article = new Article()
            {
                Description = value.Description,
                Title = value.Title,
                Url = value.Url,
                CreatedAt = DateTime.Now,
                Images = images,
                Categories = catehories
            };

            return _articleRepository.Save(article);
        }

        public bool Update(int id, ArticleUpdate value)
        {
            var articleUpdated = _articleRepository.Get(id);
            if (articleUpdated == null)
            {
                throw new Exception("Brak artykółu");
            }

            articleUpdated.Description = value.Description;
            articleUpdated.Title = value.Title;
            
            if (value.Images.Count > 0)
            {
                if (!articleUpdated.Images.Any(p => p.Image.Path.Equals(value.Images.First().Path)))
                {
                    var destination = value.Url.Replace(" ", "-");

                    _fileService.Clear(destination);

                    foreach (var item in value.Images)
                    {
                        var fileName = _fileService.Copy(item.Path, destination);
                        if (fileName == null)
                        {
                            continue;
                        }

                        articleUpdated.Images.Add(new ArticleImage()
                        {
                            Image = new Image()
                            {
                                Path = fileName,
                                CreatedAt = DateTime.Now
                            }
                        });
                    }
                }
            }

            var category = new List<ArticleCategory>();
            foreach (var item in value.Categories)
            {
                category.Add(new ArticleCategory()
                {
                    CategoryId = item
                });
            }
            articleUpdated.Categories = category;

            return _articleRepository.Update(articleUpdated);
        }
    }
}
