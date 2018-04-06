using BlogProgramistyczny.Helpers.Response;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BlogProgramistyczny.Helpers
{
    public class ResponseObjectResult : ObjectResult
    {
        public ResponseObjectResult(object value) 
            : base(new ResponseObject(value))
        {
            StatusCode = StatusCodes.Status200OK;
        }
    }
}
