using BlogProgramistyczny.Exceptions;
using BlogProgramistyczny.Helpers;
using BlogProgramistyczny.ModelView.Category;
using BlogProgramistyczny.Services.Interface;
using Microsoft.AspNetCore.Mvc;
using System;

namespace BlogProgramistyczny.Controllers
{
    [Produces("application/json")]
    public class AdministratorCategoryController : Controller
    {
        private readonly ICategoryService _categoryService;

        public AdministratorCategoryController(ICategoryService categoryService)
        {
            _categoryService = categoryService;
        }

        [HttpGet("api/Administrator/Category")]
        public IActionResult List([FromQuery(Name = "page")] int page, [FromQuery(Name = "limit")] int limit = 20, [FromQuery(Name = "sort")] string sort = "desc")
        {
            return new ResponseObjectResult(_categoryService.List(new Helpers.Paginate.Parameters() {
                Index = page,
                Size = limit,
                Sort = sort
            }));
        }

        [HttpPost("api/Administrator/Category/Add")]
        public IActionResult Add([FromBody] CategoryCreate categoryCreate)
        {
            if (categoryCreate == null)
            {
                throw new ApiException("Błąd danych");
            }

            if (!ModelState.IsValid)
            {
                throw new ApiValidationException("Walidacja");
            }

            if (!_categoryService.Save(categoryCreate))
            {
                throw new ApiException("Bład wykonano akcje zapisu kategorii");
            }

            return new ResponseObjectResult("Pomyślnie wykonano akcje dodania kategorii");
        }

        [HttpGet("api/Administrator/Category/{id}")]
        public IActionResult Category(int id)
        {
            try
            {
                return new ResponseObjectResult(_categoryService.Get(id));
            }
            catch (Exception e)
            {
                throw new ApiException(e.Message);
            }
        }

        [HttpGet("api/Administrator/Category/{id}/Remove")]
        public IActionResult Delete(int id)
        {
            try
            {
                return new ResponseObjectResult(_categoryService.Delete(id));
            }
            catch (Exception e)
            {
                throw new ApiException(e.Message);
            }
        }
    }
}