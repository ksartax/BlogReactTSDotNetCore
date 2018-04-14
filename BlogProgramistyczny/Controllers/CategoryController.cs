using BlogProgramistyczny.Helpers;
using BlogProgramistyczny.Services.Interface;
using Microsoft.AspNetCore.Mvc;

namespace BlogProgramistyczny.Controllers
{
    [Produces("application/json")]
    public class CategoryController : Controller
    {
        private readonly ICategoryService _categoryService;

        public CategoryController(ICategoryService categoryService)
        {
            _categoryService = categoryService;
        }

        [HttpGet("api/Category")]
        public IActionResult List([FromQuery(Name = "page")] int page, [FromQuery(Name = "limit")] int limit = 20, [FromQuery(Name = "sort")] string sort = "desc")
        {
            return new ResponseObjectResult(_categoryService.List(new Helpers.Paginate.Parameters() {
                Index = page,
                Size = limit,
                Sort = sort
            }));
        }
    }
}