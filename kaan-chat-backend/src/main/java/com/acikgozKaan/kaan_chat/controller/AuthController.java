package com.acikgozKaan.kaan_chat.controller;

import com.acikgozKaan.kaan_chat.dto.LoginRequest;
import com.acikgozKaan.kaan_chat.dto.RegisterRequest;
import com.acikgozKaan.kaan_chat.security.JwtUtil;
import com.acikgozKaan.kaan_chat.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/auth")
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final UserService userService;
    private final JwtUtil jwtUtil;

    public AuthController(AuthenticationManager authenticationManager, UserService userService, JwtUtil jwtUtil) {
        this.authenticationManager = authenticationManager;
        this.userService = userService;
        this.jwtUtil = jwtUtil;
    }

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody RegisterRequest registerRequest) {
        userService.registerUser(registerRequest.getUsername(), registerRequest.getPassword());
        return new ResponseEntity<>("User registered successfully", HttpStatus.CREATED);
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody LoginRequest loginRequest) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword())
            );

            UserDetails userDetails = (UserDetails) authentication.getPrincipal();
            String jwtToken = jwtUtil.generateToken(userDetails.getUsername());

            return ResponseEntity.ok(jwtToken);
        } catch (Exception e) {
            System.out.println("Login error: " + e.getMessage());
            return new ResponseEntity<>("Invalid username or password", HttpStatus.UNAUTHORIZED);
        }
    }
}

