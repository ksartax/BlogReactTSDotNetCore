using BlogProgramistyczny.Exceptions;
using BlogProgramistyczny.Helpers;
using BlogProgramistyczny.ModelView.Article;
using BlogProgramistyczny.Services.Interface;
using Microsoft.AspNetCore.Mvc;
using System;

namespace BlogProgramistyczny.Controllers
{
    [Produces("application/json")]
    public class AdministratorArticleController : Controller
    {
        private readonly IArticleService _articleService;

        public AdministratorArticleController(IArticleService articleService)
        {
            _articleService = articleService;
        }

        [HttpGet("api/Administrator/Article")]
        public IActionResult List([FromQuery(Name = "page")] int page, [FromQuery(Name = "limit")] int limit = 20, [FromQuery(Name = "sort")] string sort = "desc")
        {
            return new ResponseObjectResult(_articleService.List(new Helpers.Paginate.Parameters() {
                Index = page,
                Size = limit,
                Sort = sort
            }));
        }

        [HttpGet("api/Administrator/Article/{url}")]
        public IActionResult Article(string url)
        {
            try
            {
                return new ResponseObjectResult(_articleService.GetByUrl(url));
            }
            catch (Exception e)
            {
                throw new ApiException(e.Message);
            }
        }

        [HttpGet("api/Administrator/Article/{id}")]
        public IActionResult Article(int id)
        {
            try
            {
                return new ResponseObjectResult(_articleService.Get(id));
            }
            catch (Exception e)
            {
                throw new ApiException(e.Message);
            }
        }

        [HttpPost("api/Administrator/Article/Add")]
        public IActionResult Add([FromBody] ArticleCreate articleCreate)
        {
            if (articleCreate == null)
            {
                throw new ApiException("Błąd danych");
            }

            if (!ModelState.IsValid)
            {
                throw new ApiValidationException("Walidacja");
            }

            if (!_articleService.Save(articleCreate))
            {
                throw new ApiException("Bład wykonano akcje zapisu artykułu");
            }

            return new ResponseObjectResult("Pomyślnie wykonano akcje dodania artykułu");
        }

        [HttpPost("api/Administrator/Article/{id}/Edit")]
        public IActionResult Edit([FromBody] ArticleUpdate articleUpdate, int id)
        {
            if (articleUpdate == null)
            {
                throw new ApiException("Błąd danych");
            }

            if (!ModelState.IsValid)
            {
                throw new ApiValidationException("Walidacja");
            }

            if (!this._articleService.Update(id, articleUpdate))
            {
                throw new ApiException("Bład wykonano akcje edycji artykułu");
            }

            return new ResponseObjectResult("Pomyślnie wykonano akcje edycji artykułu");
        }
    }
}