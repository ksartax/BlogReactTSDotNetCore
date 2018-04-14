using Microsoft.AspNetCore.Http;

namespace BlogProgramistyczny.ModelView.File
{
    public class FileUploadCreateModel
    {
        public IFormFile File { get; set; }
        public string Source { get; set; }
        public long Size { get; set; }
        public int Width { get; set; }
        public int Height { get; set; }
        public string Extension { get; set; }
    }
}
