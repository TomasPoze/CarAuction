package lt.codeacademy.Car.auction.controller;


import lt.codeacademy.Car.auction.services.exceptions.PostNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MissingServletRequestParameterException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler({
            RuntimeException.class,
            PostNotFoundException.class,
            MissingServletRequestParameterException.class,
    })
    public ResponseEntity<ErrorContext> handleErrors(Exception ex, WebRequest request) {
        if (ex instanceof PostNotFoundException) {
            HttpStatus status = HttpStatus.NOT_FOUND;
            return handleProductNotFoundException((PostNotFoundException) ex, status);
        } else if (ex instanceof MissingServletRequestParameterException) {
            HttpStatus status = HttpStatus.BAD_REQUEST;
            return handleMissingParameterException((MissingServletRequestParameterException) ex, status);
        } else {
            HttpStatus status = HttpStatus.INTERNAL_SERVER_ERROR;
            return handleRuntimeException((RuntimeException) ex, status);
        }
    }


    private ResponseEntity<ErrorContext> handleMissingParameterException(
            MissingServletRequestParameterException ex, HttpStatus status
    ) {
        ErrorContext errorContext = new ErrorContext();
        errorContext.code = "3";
        errorContext.error = ex.getMessage();
        return new ResponseEntity<>(errorContext, status);
    }

    private ResponseEntity<ErrorContext> handleRuntimeException(RuntimeException ex, HttpStatus status) {
        ErrorContext errorContext = new ErrorContext();
        errorContext.error = ex.getMessage();
        errorContext.code = "999";
        return new ResponseEntity<>(errorContext, status);
    }

    private ResponseEntity<ErrorContext> handleProductNotFoundException(PostNotFoundException ex, HttpStatus status) {
        ErrorContext errorContext = new ErrorContext();
        errorContext.error = ex.getMessage();
        errorContext.code = "2";
        return new ResponseEntity<>(errorContext, status);
    }

}
