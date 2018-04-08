using BlogProgramistyczny.Helpers;
using BlogProgramistyczny.Services.Interface;
using Microsoft.AspNetCore.Mvc;

namespace BlogProgramistyczny.Controllers
{
    [Produces("application/json")]
    public class ProfileController : Controller
    {
        private readonly IProfileService _profileService;

        public ProfileController(IProfileService profileService)
        {
            _profileService = profileService;
        }

        [HttpGet("api/Profile")]
        public IActionResult Index()
        {
            return new ResponseObjectResult(_profileService.List(new Helpers.Paginate.Parameters() {
                Index = 1,
                Size = 1
            }));
        }
    }
}