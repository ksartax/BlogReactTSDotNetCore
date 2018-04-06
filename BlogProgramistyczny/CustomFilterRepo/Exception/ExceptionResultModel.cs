using BlogProgramistyczny.Exceptions;

namespace BlogProgramistyczny.CustomFilterRepo.Exception
{
    public class ExceptionResultModel
    {
        public string Message { get; set; }
        public int Code { get; set; }

        public ExceptionResultModel(System.Exception exception)
        {
            if (exception is ApiException apiException)
            {
                Code = apiException.Code;
            }

            Message = exception.Message;
        }
    }
}
