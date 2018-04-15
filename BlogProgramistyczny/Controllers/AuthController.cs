using BlogProgramistyczny.Exceptions;
using BlogProgramistyczny.ModelView.Login;
using BlogProgramistyczny.Services.Interface;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace BlogProgramistyczny.Controllers
{
    [Produces("application/json"), Route("api/Auth")]
    public class AuthController : Controller
    {
        private readonly IAuthService _authService;

        public AuthController(IAuthService authService)
        {
            _authService = authService;
        }

        [AllowAnonymous, HttpPost]
        public IActionResult Index([FromBody]LoginModel login)
        {
            IActionResult response = Unauthorized();
            if (login == null)
            {
                throw new ApiException("Błąd danych");
            }

            var _token = _authService.Token(login);
            if (_token != null)
            {
                response = Ok(new { token = _token, code = 200 });
            }

            return response;
        }
    }
}