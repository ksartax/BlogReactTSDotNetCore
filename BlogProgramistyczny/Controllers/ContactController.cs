using BlogProgramistyczny.Exceptions;
using BlogProgramistyczny.Helpers;
using BlogProgramistyczny.ModelView.Contact;
using BlogProgramistyczny.Services.Interface;
using Microsoft.AspNetCore.Mvc;

namespace BlogProgramistyczny.Controllers
{
    [Produces("application/json")]
    public class ContactController : Controller
    {
        private readonly IEmailService _emailService;

        public ContactController(IEmailService emailService)
        {
            _emailService = emailService;
        }

        [HttpPost, Route("api/Contact/Send")]
        public IActionResult Send([FromBody] Contact contact)
        {
            if (contact == null)
            {
                throw new ApiException("Błąd danych");
            }

            if (!ModelState.IsValid)
            {
                throw new ApiValidationException("");
            }

            return new ResponseObjectResult(this._emailService.SendEmailAsync(contact).Result);
        }
    }
}