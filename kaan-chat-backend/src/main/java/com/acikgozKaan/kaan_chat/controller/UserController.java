package com.acikgozKaan.kaan_chat.controller;

import com.acikgozKaan.kaan_chat.entity.User;
import com.acikgozKaan.kaan_chat.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/profile")
    public ResponseEntity<User> getUserProfile(Authentication authentication) {
        String username = authentication.getName();
        User user = userService.findByUsername(username);
        return ResponseEntity.ok(user);
    }

    @PutMapping("/update")
    public ResponseEntity<User> updateUser(@RequestBody User request, Authentication authentication) {
        String authenticatedUsername = authentication.getName();

        if (!authenticatedUsername.equals(request.getUsername())) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }

        User updatedUser = userService.updateUser(request.getId(), request.getUsername(), request.getPassword());
        return ResponseEntity.ok(updatedUser);
    }
}
