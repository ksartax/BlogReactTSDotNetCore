using BlogProgramistyczny.Helpers;
using BlogProgramistyczny.Services.Interface;
using Microsoft.AspNetCore.Mvc;

namespace BlogProgramistyczny.Controllers
{
    [Produces("application/json")]
    [Route("api/Profile")]
    public class ProfileController : Controller
    {
        private readonly IProfileService _profileService;

        public ProfileController(IProfileService profileService)
        {
            _profileService = profileService;
        }

        [HttpGet]
        public IActionResult Index()
        {
            return new ResponseObjectResult(_profileService.List(1, 1, ""));
        }
    }
}