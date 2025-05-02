package org.tacomaster.tacomaster.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.tacomaster.tacomaster.model.User;
import org.tacomaster.tacomaster.service.UserService;

import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController{
    private UserService userService;
    public UserController(UserService userService){
        this.userService = userService;
    }

    @PostMapping
    public ResponseEntity<User> create(@RequestBody User user){
        return ResponseEntity.ok(userService.saveUser(user));
    }

    @GetMapping
    public ResponseEntity<List<User>> getAllUsers() {
        return ResponseEntity.ok(userService.getAllUsers());
    }
}