package com.example.demo.exception;

public class FreeException extends RuntimeException {
  private int status;
  private String message;

  public FreeException setStatus(int status) {
    this.status = status;
    return this;
  }

  public FreeException setMessage(String message) {
    this.message = message;
    return this;
  }

  public int getStatus() {
    return status;
  }
  
  @Override
  public String getMessage() {
    return message;
  }
}
