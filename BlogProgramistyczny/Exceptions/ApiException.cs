using System;

namespace BlogProgramistyczny.Exceptions
{
    public class ApiException : ApplicationException
    {
        public int Code { get; set; }

        public ApiException(String message) : base(message)
        {}

        public ApiException(String message, int code) : base(message)
        {
            this.Code = code;
        }
    }
}
