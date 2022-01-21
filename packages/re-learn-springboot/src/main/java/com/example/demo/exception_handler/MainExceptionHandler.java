package com.example.demo.exception_handler;

import com.example.demo.exception.FreeException;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class MainExceptionHandler {
  @ExceptionHandler(value = FreeException.class)
  public ResponseEntity<Object> freeException(FreeException ex) {
    return new ResponseEntity<>("{\"message\": \"" + ex.getMessage() + "\", \"code\": " + ex.getStatus() + "}",
        HttpStatus.valueOf(ex.getStatus()));
  }

}
