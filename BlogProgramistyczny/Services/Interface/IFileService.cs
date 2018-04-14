using BlogProgramistyczny.ModelView.File;

namespace BlogProgramistyczny.Services.Interface
{
    public interface IFileService
    {
        FileUploadViewModel Upload(FileUploadCreateModel fileUploadViewModel);
        string Copy(string source, string destination);
        void Clear(string source);
    }
}
