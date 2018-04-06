using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;

namespace BlogProgramistyczny.CustomFilterRepo.Validate
{
    public class ValidationResult : ObjectResult
    {
        public ValidationResult(ModelStateDictionary modelStateDictionary) 
            : base(new ValidationFailResultModel(modelStateDictionary))
        {
            StatusCode = StatusCodes.Status422UnprocessableEntity;
        }
    }
}
