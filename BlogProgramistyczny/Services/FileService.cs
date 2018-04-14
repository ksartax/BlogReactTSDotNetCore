using BlogProgramistyczny.ModelView.File;
using BlogProgramistyczny.Services.Interface;
using Microsoft.AspNetCore.Hosting;
using System;
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

        public void Clear(string source)
        {
            string _path = Path.Combine(_env.WebRootPath, source);
            if (Directory.Exists(_path))
            {
                foreach (FileInfo file in (new DirectoryInfo(_path)).EnumerateFiles())
                {
                    file.Delete();
                }
            }
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

        public FileUploadViewModel Upload(FileUploadCreateModel fileUploadViewModel)
        {
            if (fileUploadViewModel.File.Length < 0)
            {
                return null;
            }

            string _path = Path.Combine(_env.WebRootPath, "uploadFiles");
            if (!Directory.Exists(_path))
            {
                Directory.CreateDirectory(_path);
            }
            else
            {
                foreach (FileInfo file in (new DirectoryInfo(_path)).EnumerateFiles())
                {
                    file.Delete();
                }
            }

            var fileName = (new Random()).Next() + "." + Path.GetExtension(fileUploadViewModel.File.FileName).Substring(1);
            using (var fs = new FileStream(Path.Combine(_path, fileName), FileMode.Create))
            {
                fileUploadViewModel.File.CopyTo(fs);
            }

            return new FileUploadViewModel() {
                Extension = Path.GetExtension(fileName).Substring(1),
                Height = fileUploadViewModel.Height,
                Size = fileUploadViewModel.Size,
                Source = $"/uploadFiles/{fileName}"
            };
        }
    }
}
