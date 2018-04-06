using BlogProgramistyczny.Exceptions;
using BlogProgramistyczny.Helpers;
using BlogProgramistyczny.ModelView.ArticleComment;
using BlogProgramistyczny.Services.Interface;
using Microsoft.AspNetCore.Mvc;
using System;

namespace BlogProgramistyczny.Controllers
{
    [Produces("application/json")]
    public class AdministratorCommentsController : Controller
    {
        private readonly ICommentService _commentService;

        public AdministratorCommentsController(ICommentService commentService)
        {
            _commentService = commentService;
        }

        [HttpGet("api/Administrator/Comments")]
        public IActionResult Index([FromQuery(Name = "page")] string page, [FromQuery(Name = "limit")] string limit = "20", [FromQuery(Name = "sort")] string sort = "desc")
        {
            return new ResponseObjectResult(_commentService.List(Int16.Parse(page), Int16.Parse(limit), sort));
        }

        [HttpGet("api/Administrator/Comments/{id}/Remove")]
        public IActionResult Remove(int id)
        {
            try
            {
                return new ResponseObjectResult(_commentService.Delete(id));
            }
            catch (Exception e)
            {
                throw new ApiException(e.Message);
            }
        }

        [HttpPost("api/Administrator/Comments/{id}/Replay")]
        public IActionResult Add([FromBody] ArticleCommentCreate commentCreate, int id)
        {
            if (commentCreate == null)
            {
                throw new ApiException("Błąd danych");
            }

            if (!ModelState.IsValid)
            {
                throw new ApiValidationException("");
            }

            if (!_commentService.Replace(id, commentCreate))
            {
                throw new ApiException("Bład wykonano akcje");
            }

            return new ResponseObjectResult("Pomyślnie wykonano akcje");
        }
    }
}
