using BlogProgramistyczny.ModelView.Contact;
using System.Threading.Tasks;

namespace BlogProgramistyczny.Services.Interface
{
    public interface IEmailService
    {
        Task<bool> SendEmailAsync(Contact contact);
    }
}
