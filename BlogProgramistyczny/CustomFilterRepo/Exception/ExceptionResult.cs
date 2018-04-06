using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BlogProgramistyczny.CustomFilterRepo.Exception
{
    public class ExceptionResult : ObjectResult
    {
        public ExceptionResult(System.Exception value) 
            : base(new ExceptionResultModel(value))
        {
            StatusCode = StatusCodes.Status500InternalServerError;
        }
    }
}
