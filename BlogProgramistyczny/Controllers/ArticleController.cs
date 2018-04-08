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
        private readonly IArticleCommentService _articleCommentService;

        public ArticleController(IArticleService articleService, IArticleCommentService articleCommentService)
        {
            _articleService = articleService;
            _articleCommentService = articleCommentService;
        }

        [HttpGet, Route("api/Article")]
        public IActionResult List([FromQuery(Name = "page")] int page, [FromQuery(Name = "limit")] int limit = 20, [FromQuery(Name = "sort")] string sort = "desc")
        {
            return new ResponseObjectResult(_articleService.List(new Helpers.Paginate.Parameters() {
                Index = page,
                Size = limit,
                Sort = sort
            }));
        }

        [HttpGet("api/Article/{url}")]
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

        [HttpGet("api/Article/{id}/Comments")]
        public IActionResult Comments(int id)
        {
            try
            {
                return new ResponseObjectResult(_articleCommentService.Get(id));
            }
            catch (Exception e)
            {
                throw new ApiException(e.Message);
            }
        }

        [HttpGet("api/Article/New")]
        public IActionResult GetNewArticle()
        {
            return new ResponseObjectResult(_articleService.GetNewArticle());
        }

        [HttpPost("api/Article/{id}/Comment/Add")]
        public IActionResult AddComment(int id, [FromBody] ArticleCommentCreate articleCommentCreate)
        {
            if (articleCommentCreate == null)
            {
                throw new ApiException("Błąd danych parametru");
            }

            if (!ModelState.IsValid)
            {
                throw new ApiValidationException("Walidacja");
            }

            if (!_articleCommentService.Add(id, articleCommentCreate)) 
            {
                throw new ApiException("Wystąpił bład podczas dodawania komentarza");
            }

            return new ResponseObjectResult("Akcja wykonana porawnie");
        }
    }
}