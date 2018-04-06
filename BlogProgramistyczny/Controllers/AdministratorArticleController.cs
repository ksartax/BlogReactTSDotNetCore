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
        public IActionResult List([FromQuery(Name = "page")] string page, [FromQuery(Name = "limit")] string limit = "20", [FromQuery(Name = "sort")] string sort = "desc")
        {
            return new ResponseObjectResult(this._articleService.List(Int16.Parse(page), Int16.Parse(limit), sort));
        }

        [HttpGet("api/Administrator/Article/{url}")]
        public IActionResult Article(string url)
        {
            if (url == null)
            {
                throw new ApiException("Błads");
            }

            try
            {
                return new ResponseObjectResult(this._articleService.Get(url));
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
                return new ResponseObjectResult(this._articleService.Get(id));
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
                throw new ApiValidationException("");
            }

            if (!this._articleService.Save(articleCreate))
            {
                throw new ApiException("Bład wykonano akcje");
            }

            return new ResponseObjectResult("Pomyślnie wykonano akcje");
        }

        [HttpPost("api/Administrator/Article/{id}/Edit")]
        public IActionResult Edit([FromBody] ArticleCreate articleCreate, string id)
        {
            if (articleCreate == null)
            {
                throw new ApiException("Błąd danych");
            }

            if (!ModelState.IsValid)
            {
                throw new ApiValidationException("");
            }

            if (!this._articleService.Update(int.Parse(id), articleCreate))
            {
                throw new ApiException("Bład wykonano akcje");
            }

            return new ResponseObjectResult("Pomyślnie wykonano akcje");
        }
    }
}