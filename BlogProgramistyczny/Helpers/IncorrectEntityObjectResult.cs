using BlogProgramistyczny.Helpers.Validate;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using System;

namespace BlogProgramistyczny.Helpers
{
    public class IncorrectEntityObjectResult : ObjectResult
    {
        public IncorrectEntityObjectResult(ModelStateDictionary modelStateDictionary) 
            : base(new ValidationFailResultModel(modelStateDictionary))
        {
            if (modelStateDictionary == null)
            {
                throw new ArgumentNullException(nameof(modelStateDictionary));
            }
            StatusCode = StatusCodes.Status422UnprocessableEntity;
        }
    }
}
