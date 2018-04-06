using BlogProgramistyczny.Exceptions;
using BlogProgramistyczny.Helpers;
using BlogProgramistyczny.ModelView.Profil;
using BlogProgramistyczny.Services.Interface;
using Microsoft.AspNetCore.Mvc;

namespace BlogProgramistyczny.Controllers
{
    [Produces("application/json")]
    public class AdministratorProfileController : Controller
    {
        private readonly IProfileService _profileService;

        public AdministratorProfileController(IProfileService profileService)
        {
            _profileService = profileService;
        }

        [HttpGet("api/Administrator/Profile")]
        public IActionResult Index()
        {
            return new ResponseObjectResult(_profileService.List(1, 1, ""));
        }

        [HttpPost("api/Administrator/Profile/Add")]
        public IActionResult AddProfile([FromBody] ProfilCreate profilCreate)
        {
            if (profilCreate == null)
            {
                throw new ApiException("Błąd danych");
            }

            if (!ModelState.IsValid)
            {
                throw new ApiValidationException("");
            }

            if (!this._profileService.CreateOrUpdate(profilCreate))
            {
                throw new ApiException("Bład wykonano akcje");
            }

            return new ResponseObjectResult("Pomyślnie wykonano akcje");
        }
    }
}
