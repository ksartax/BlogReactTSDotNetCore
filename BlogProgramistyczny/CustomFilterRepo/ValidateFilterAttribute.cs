using BlogProgramistyczny.CustomFilterRepo.Validate;
using BlogProgramistyczny.Exceptions;
using Microsoft.AspNetCore.Mvc.Filters;

namespace BlogProgramistyczny.CustomFilterRepo
{
    public class ValidateFilterAttribute : Microsoft.AspNetCore.Mvc.Filters.ExceptionFilterAttribute, IExceptionFilter
    {
        public override void OnException(ExceptionContext context)
        {
            if (context.Exception is ApiValidationException apiValidationException)
            {
                context.Result = new ValidationResult(context.ModelState);
            }
        }
    }
}
