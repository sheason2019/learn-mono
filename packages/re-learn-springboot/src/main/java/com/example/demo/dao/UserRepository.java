package com.example.demo.dao;

import java.util.Optional;

import com.example.demo.entity.User;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@EnableJpaRepositories
public interface UserRepository extends JpaRepository<User, Integer> {
  Optional<User> findById(Integer id);
  Optional<User> findByName(String name);
}
