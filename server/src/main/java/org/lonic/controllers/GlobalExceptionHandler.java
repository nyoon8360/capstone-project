package org.lonic.controllers;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.HttpMediaTypeNotSupportedException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(DataIntegrityViolationException.class)
    public ResponseEntity<ErrorResponse> handleException(DataIntegrityViolationException ex) {
        return ErrorResponse.build("Something went wrong in the database. " +
                "Please ensure that any referenced records exist. Your request failed. :(");
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponse> handleException(Exception ex) throws Exception {

        // The JSON sent by the client might be malformed.
        // There might be a type mismatch, such as sending a string where an integer is expected.
        // Missing essential properties that are marked as required in the DTO (Data Transfer Object).
        if (ex instanceof HttpMessageNotReadableException || ex instanceof HttpMediaTypeNotSupportedException) {
            throw ex;
        }

        return ErrorResponse.build("Something went wrong on our end. Your request failed. :(");
    }
}
