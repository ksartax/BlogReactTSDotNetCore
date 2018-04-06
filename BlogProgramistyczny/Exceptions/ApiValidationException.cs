using System;

namespace BlogProgramistyczny.Exceptions
{
    public class ApiValidationException : ApplicationException
    {
        public int Code { get; set; }

        public ApiValidationException(String message) : base(message)
        {}

        public ApiValidationException(String message, int code) : base(message)
        {
            this.Code = code;
        }
    }
}
