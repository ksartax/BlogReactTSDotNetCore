using BlogProgramistyczny.ModelView.Login;

namespace BlogProgramistyczny.Services.Interface
{
    public interface IAuthService
    {
        string Token(LoginModel login);
    }
}
