using Microsoft.AspNetCore.Http;
using System;

namespace BlogProgramistyczny.Helpers.Response
{
    public class ResponseObject
    {
        public string Message { get; set; }
        public int Code { get; set; }
        public Object ResponseData { get; set; }

        public ResponseObject(Object value)
        {
            Message = "Akcja wykonana poprawnie";
            Code = StatusCodes.Status200OK;
            ResponseData = value;
        }
    }
}
