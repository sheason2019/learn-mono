package com.example.demo.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import com.example.demo.dao.UserRepository;
import com.example.demo.entity.User;
import com.example.demo.exception.FreeException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/user")
public class UserController {
  @Autowired
  UserRepository repository;

  @GetMapping("/{userId}")
  public String getUser(@PathVariable int userId) {
    Optional<User> user = repository.findById(userId);
    if (user.isPresent()) {
      return user.get().toString();
    } else {
      return "没有找到指定用户";
    }
  }

  @PutMapping("/{userId}")
  public String putUser(@PathVariable int userId, @RequestParam(name = "name", required = false) String name) {
    Optional<User> optionalUser = repository.findById(userId);
    if (!optionalUser.isPresent()) {
      return "未找到指定用户";
    } else {
      if (name == null)
        return "缺少关键信息";
      optionalUser.get().setName(name);
      repository.save(optionalUser.get());
      return "修改用户信息成功";
    }
  }

  @PostMapping("/")
  public String addUser(@RequestParam(name = "name") String name, @RequestParam(name = "password") String password) {
    if (name != null) {
      repository.save(new User(name, password));
      return "新增用户成功";
    } else {
      return "参数有误，新增用户失败";
    }
  }

  @DeleteMapping("/{userId}")
  public String deleteUser(@PathVariable int userId) {
    Optional<User> optionalUser = repository.findById(userId);
    if (!optionalUser.isPresent()) {
      return "未找到指定用户";
    } else {
      repository.delete(optionalUser.get());
      return "删除用户成功";
    }
  }

  @GetMapping("/")
  public List<String> userList() {
    List<String> result = new ArrayList<>();
    List<User> users = repository.findAll();
    for (User user : users) {
      result.add(user.toString());
    }
    return result;
  }

  @PostMapping("/action/login")
  public String login(
      @RequestParam(name = "name") String name,
      @RequestParam(name = "password") String password) {
    Optional<User> optionalUser = repository.findByName(name);
    if (optionalUser.isPresent()) {
      if (!password.equals(optionalUser.get().getPassword())) {
        throw (new FreeException()).setMessage("密码错误").setStatus(401);
      } else {
        return optionalUser.get().toString();
      }
    }
    throw (new FreeException()).setMessage("未找到指定用户").setStatus(404);
  }
}
