using BlogProgramistyczny.Services.Interface;
using Microsoft.Extensions.Configuration;
using System.Net;
using System.Net.Mail;
using RazorLight;
using System.IO;
using System.Threading.Tasks;
using BlogProgramistyczny.ModelView.Contact;

namespace BlogProgramistyczny.Services
{
    public class EmailService : IEmailService
    {
        private readonly IConfiguration _configuration;

        public EmailService(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        private async Task<string> CreateTemplate(Contact contact)
        {
            var engine = new RazorLightEngineBuilder()
             .UseFilesystemProject($@"{Directory.GetCurrentDirectory()}\Template")
             .UseMemoryCachingProvider()
             .Build();

            return await engine.CompileRenderAsync("Email.cshtml", contact);
        }

        public async Task<bool> SendEmailAsync(Contact contact)
        {
            string body = await CreateTemplate(contact);

            using (var client = new SmtpClient())
            {
                var credential = new NetworkCredential
                {
                    UserName = _configuration["Email:Email"],
                    Password = _configuration["Email:Password"]
                };

                client.Credentials = credential;
                client.Host = _configuration["Email:Host"];
                client.Port = int.Parse(_configuration["Email:Port"]);
                client.EnableSsl = true;

                using (var emailMessage = new MailMessage())
                {
                    emailMessage.To.Add(new MailAddress(_configuration["Email:EmailOfficial"]));
                    emailMessage.From = new MailAddress(_configuration["Email:Email"]);
                    emailMessage.Subject = contact.Title;
                    emailMessage.Body = body;
                    emailMessage.IsBodyHtml = true;
                    client.Send(emailMessage);
                }
            }

            return true;
        }
    }
}
