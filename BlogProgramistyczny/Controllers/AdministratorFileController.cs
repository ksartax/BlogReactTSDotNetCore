using BlogProgramistyczny.Exceptions;
using BlogProgramistyczny.Helpers;
using BlogProgramistyczny.ModelView.File;
using BlogProgramistyczny.Services.Interface;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace BlogProgramistyczny.Controllers
{
    [Authorize]
    public class AdministratorFileController : Controller
    {
        private readonly IFileService _fileService;

        public AdministratorFileController(IFileService fileService)
        {
            _fileService = fileService;
        }

        [HttpPost("api/Administrator/File/Upload")]
        public IActionResult UploadProfilImg(FileUploadCreateModel model)
        {
            if (model == null)
            {
                throw new ApiException("Błąd parametrów");
            }

            var file = _fileService.Upload(model);
            if (file == null)
            {
                throw new ApiException("Bład");
            }

            return new ResponseObjectResult(file);
        }
    }
}
