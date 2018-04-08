using BlogProgramistyczny.ModelView.File;
using BlogProgramistyczny.Services.Interface;
using Microsoft.AspNetCore.Hosting;
using System.IO;
using System.Linq;

namespace BlogProgramistyczny.Services
{
    public class FileService : IFileService
    {
        private readonly IHostingEnvironment _env;

        public FileService(IHostingEnvironment env)
        {
            _env = env;
        }

        public string Copy(string source, string destination)
        {
            string _source = _env.WebRootPath + source;
            if (!File.Exists(_source))
            {
                return null;
            }

            string _destinationDir = _env.WebRootPath + "/" + destination;
            if (!Directory.Exists(_destinationDir))
            {
                Directory.CreateDirectory(_destinationDir);
            }

            var sourceFileName = source.Split("/").Last();
            var destinationPath = _destinationDir + "/" + sourceFileName;

            File.Copy(_source, destinationPath, true);

            if (!File.Exists(destinationPath))
            {
                return null;
            }

            return destination + "/" + sourceFileName;
        }

        public FileUploadViewModel Upload(string path, FileUploadViewModel fileUploadViewModel, string fileNameDefault = null)
        {
            var file = fileUploadViewModel.File;
            var fileName = file.FileName;

            if (fileNameDefault != null)
            {
                fileName = fileNameDefault + "." + fileName.Split(".")[1];
            }

            if (file.Length > 0)
            {
                string _path = Path.Combine(_env.WebRootPath, path);

                if (!Directory.Exists(_path))
                {
                    Directory.CreateDirectory(_path);
                }
                
                using (var fs = new FileStream(Path.Combine(_path, fileName), FileMode.Create))
                {
                    file.CopyTo(fs);
                }

                fileUploadViewModel.Source = $"/{path}/{fileName}";
                fileUploadViewModel.Extension = Path.GetExtension(fileName).Substring(1);
            }

            return fileUploadViewModel;
        }
    }
}
