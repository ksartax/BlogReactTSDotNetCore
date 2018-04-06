using BlogProgramistyczny.Exceptions;
using BlogProgramistyczny.Helpers;
using BlogProgramistyczny.ModelView.ArticleComment;
using BlogProgramistyczny.Services.Interface;
using Microsoft.AspNetCore.Mvc;
using System;

namespace BlogProgramistyczny.Controllers
{
    [Produces("application/json")]
    public class ArticleController : Controller
    {
        private readonly IArticleService _articleService;

        public ArticleController(IArticleService articleService)
        {
            _articleService = articleService;
        }

        [HttpGet, Route("api/Article")]
        public IActionResult List([FromQuery(Name = "page")] string page, [FromQuery(Name = "limit")] string limit = "20", [FromQuery(Name = "sort")] string sort = "desc")
        {
            return new ResponseObjectResult(this._articleService.List(Int16.Parse(page), Int16.Parse(limit), sort));
        }

        [HttpGet("api/Article/{url}")]
        public IActionResult Article(string url)
        {
            try
            {
                return new ResponseObjectResult(this._articleService.Get(url));
            }
            catch (Exception e)
            {
                throw new ApiException(e.Message);
            }
        }

        [HttpGet("api/Article/{id}/Comments")]
        public IActionResult Comments(int id)
        {
            try
            {
                return new ResponseObjectResult(this._articleService.GetComments(id));
            }
            catch (Exception e)
            {
                throw new ApiException(e.Message);
            }
        }

        [HttpGet("api/Article/New")]
        public IActionResult GetNewArticle()
        {
            return new ResponseObjectResult(this._articleService.GetNewArticle());
        }

        [HttpPost("api/Article/{id}/Comment/Add")]
        public IActionResult AddComment(int id, [FromBody] ArticleCommentCreate articleCommentCreate)
        {
            if (articleCommentCreate == null)
            {
                throw new ApiException("Błąd danych");
            }

            if (!ModelState.IsValid)
            {
                throw new ApiValidationException("");
            }

            var articleComment = this._articleService.AddComment(id, articleCommentCreate);
            if (articleComment == null) 
            {
                throw new ApiException("Wystąpił bład podczas dodawania komentarza");
            }

            return new ResponseObjectResult(articleComment);
        }
    }
}