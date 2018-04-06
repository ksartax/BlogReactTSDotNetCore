using BlogProgramistyczny.Exceptions;
using BlogProgramistyczny.Helpers;
using BlogProgramistyczny.ModelView.File;
using BlogProgramistyczny.Services.Interface;
using Microsoft.AspNetCore.Mvc;
using System;

namespace BlogProgramistyczny.Controllers
{
    public class AdministratorFileController : Controller
    {
        private readonly IFileService _fileService;

        public AdministratorFileController(IFileService fileService)
        {
            _fileService = fileService;
        }

        [HttpPost("api/Administrator/File/Upload/{path}")]
        public IActionResult UploadProfilImg(FileUploadViewModel model, string path)
        {
            if (model == null)
            {
                throw new ApiException("Błąd");
            }

            var file = _fileService.Upload(path, model, path);
            if (file == null)
            {
                throw new ApiException("Bład");
            }

            return new ResponseObjectResult(file);
        }
    }
}
