using BlogProgramistyczny.Context;
using BlogProgramistyczny.CustomFilterRepo;
using BlogProgramistyczny.Repository;
using BlogProgramistyczny.Repository.Interface;
using BlogProgramistyczny.Services;
using BlogProgramistyczny.Services.Interface;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Cors.Internal;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using System.Text;

namespace BlogProgramistyczny
{
    public class Startup
    {
        public IConfiguration Configuration { get; }

        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(options =>
                {
                    options.TokenValidationParameters = new Microsoft.IdentityModel.Tokens.TokenValidationParameters
                    {
                        ValidateIssuer = true,
                        ValidateAudience = true,
                        ValidateLifetime = true,
                        ValidateIssuerSigningKey = true,
                        ValidIssuer = Configuration["Jwt:Issuer"],
                        ValidAudience = Configuration["Jwt:Issuer"],
                        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Configuration["Jwt:Key"]))
                    };
                });

            #region Repository
            services.AddScoped<IArticleRepository, ArticleRepository>();
            services.AddScoped<ICategoryRepository, CategoryRepository>();
            services.AddScoped<IProfileRepository, ProfileRepository>();
            services.AddScoped<ICommentRepository, CommentRepository>();

            services.AddTransient<IEmailService, EmailService>();
            #endregion
            #region Service
            services.AddScoped<IAuthService, AuthService>();
            services.AddScoped<IArticleService, ArticleService>();
            services.AddScoped<ICategoryService, CategoryService>();
            services.AddScoped<IProfileService, ProfileService>();
            services.AddScoped<ICommentService, CommentService>();
            services.AddScoped<IArticleCommentService, ArticleCommentService>();

            services.AddScoped<IFileService, FileService>();
            #endregion

            services.AddDbContext<ApplicationContext>(
                options => options.UseSqlServer(
                    Configuration.GetConnectionString("DefaultConnection")));

            services.AddMvc(options => {
                options.Filters.Add(new ExceptionFilterAttribute());
                options.Filters.Add(new ValidateFilterAttribute());
            });

            services.AddCors(options =>
            {
                options.AddPolicy("AllowAnyOrigin",
                    builder => builder
                    .AllowAnyOrigin()
                    .AllowAnyMethod()
                    .AllowAnyHeader());
            });

            services.Configure<MvcOptions>(options => {
                options.Filters.Add(new CorsAuthorizationFilterFactory("AllowAnyOrigin"));
            });
        }

        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseAuthentication();
            app.UseStaticFiles();
            app.UseMvc();
        }
    }
}
