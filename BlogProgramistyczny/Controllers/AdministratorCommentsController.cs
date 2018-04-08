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
        public IActionResult Index([FromQuery(Name = "page")] int page, [FromQuery(Name = "limit")] int limit = 20, [FromQuery(Name = "sort")] string sort = "desc")
        {
            return new ResponseObjectResult(_commentService.List(new Helpers.Paginate.Parameters() {
                Sort = sort,
                Size = limit,
                Index = page
            }));
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
                throw new ApiException("Błąd danych parametru");
            }

            if (!ModelState.IsValid)
            {
                throw new ApiValidationException("Walidacja");
            }

            if (!_commentService.Replace(id, commentCreate))
            {
                throw new ApiException("Bład wykonano akcji dopowiedzi na komentarz");
            }

            return new ResponseObjectResult("Pomyślnie wykonano akcje dopowiedzi na komentarz");
        }
    }
}
