using BlogProgramistyczny.CustomFilterRepo.Exception;
using BlogProgramistyczny.Exceptions;
using Microsoft.AspNetCore.Mvc.Filters;

namespace BlogProgramistyczny.CustomFilterRepo
{
    public class ExceptionFilterAttribute : Microsoft.AspNetCore.Mvc.Filters.ExceptionFilterAttribute, IExceptionFilter
    {
        public override void OnException(ExceptionContext context)
        {
            if (context.Exception is ApiException apiException)
            {
                context.Result = new ExceptionResult(apiException); 
            }
        }
    }
}
