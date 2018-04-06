using BlogProgramistyczny.ModelView.File;

namespace BlogProgramistyczny.Services.Interface
{
    public interface IFileService
    {
        FileUploadViewModel Upload(string path, FileUploadViewModel fileUploadViewModel, string fileNameDefault);
        string Copy(string source, string destination);
    }
}
