using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using System.Collections.Generic;
using System.Linq;

namespace BlogProgramistyczny.CustomFilterRepo.Validate
{
    public class ValidationFailResultModel
    {
        public string Message { get; set; }
        public int Code { get; set; }
        public List<ValidationError> Errors { get; set; }

        public ValidationFailResultModel(ModelStateDictionary modelStateDictionary)
        {
            Message = "Błąd walidacji";
            Code = StatusCodes.Status422UnprocessableEntity;
            Errors = modelStateDictionary.Keys
                    .SelectMany(key => modelStateDictionary[key]
                    .Errors.Select(x => new ValidationError(key, x.ErrorMessage)))
                    .ToList();
        }
    }
}
