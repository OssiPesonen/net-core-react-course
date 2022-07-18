namespace Application.Core;

public class Result<T>
{
    public bool IsSuccess { get; set; }
    
    public bool IsNew { get; set; }

    public T? Value { get; set; }

    public string Error { get; set; } = string.Empty;

    public static Result<T> Success(T value) => new Result<T> {IsSuccess = true, Value = value};

    public static Result<T> SuccessNew(T value) => new Result<T> {IsSuccess = true, Value = value, IsNew = true};

    public static Result<T> Failure(string error) => new Result<T> {IsSuccess = false, Error = error};
}