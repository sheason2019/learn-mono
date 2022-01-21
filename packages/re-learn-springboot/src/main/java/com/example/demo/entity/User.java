package com.example.demo.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "users")
public class User {
  @Id
  @GeneratedValue
  private Integer id;
  @Column(name = "name")
  private String name;
  @Column(name = "password")
  private String password;
  
  protected User() {}
  public User(String name) {
    super();
    this.name = name;
  }
  public User(String name, String password) {
    super();
    this.name = name;
    this.password = password;
  }

  // ** getter setter start **
  public String getName() {
    return name;
  }
  public void setName(String name) {
    this.name = name;
  }
  public Integer getId() {
    return id;
  }
  public void setId(Integer id) {
    this.id = id;
  }
  public String getPassword() {
    return password;
  }
  public void setPassword(String password) {
    this.password = password;
  }

  // ** getter setter end **

  @Override
  public String toString() {
    return "{\"id\": " + id + ", \"name\": \"" + name + "\", \"password\": \"" + password + "\"}";
  }
}
