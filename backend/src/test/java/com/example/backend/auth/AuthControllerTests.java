package com.example.backend.auth;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertThrows;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.example.backend.auth.dto.LoginRequest;
import com.example.backend.auth.dto.LoginResponse;
import com.example.backend.auth.dto.RegisterRequest;
import com.example.backend.auth.dto.RegisterResponse;
import com.example.backend.auth.exception.DuplicateAccountException;
import com.example.backend.auth.exception.InvalidCredentialsException;
import com.example.backend.auth.service.AuthService;

@SpringBootTest
class AuthControllerTests {

    @Autowired
    private AuthService authService;

    @Test
    void registerCreatesNewAccount() {
        RegisterResponse response = authService.register(new RegisterRequest("newuser@example.com", "StrongPass123"));

        assertEquals("newuser@example.com", response.email());
        assertNotNull(response.userId());
    }

    @Test
    void registerReturnsConflictWhenEmailAlreadyExists() {
        RegisterRequest request = new RegisterRequest("dupeuser@example.com", "StrongPass123");

        authService.register(request);

        assertThrows(DuplicateAccountException.class, () -> authService.register(request));
    }

    @Test
    void loginSucceedsWithValidCredentials() {
        authService.register(new RegisterRequest("loginuser@example.com", "StrongPass123"));

        LoginResponse response = authService.login(new LoginRequest("loginuser@example.com", "StrongPass123"));
        assertEquals("loginuser@example.com", response.email());
        assertNotNull(response.token());
    }

    @Test
    void loginFailsWithWrongPassword() {
        authService.register(new RegisterRequest("wrongpass@example.com", "StrongPass123"));

        assertThrows(InvalidCredentialsException.class,
                () -> authService.login(new LoginRequest("wrongpass@example.com", "bad-pass")));
    }
}
