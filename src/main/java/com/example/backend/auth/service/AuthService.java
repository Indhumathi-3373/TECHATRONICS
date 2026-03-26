package com.example.backend.auth.service;

import java.util.Locale;
import java.util.UUID;
import java.util.regex.Pattern;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.backend.auth.dto.LoginRequest;
import com.example.backend.auth.dto.LoginResponse;
import com.example.backend.auth.dto.RegisterRequest;
import com.example.backend.auth.dto.RegisterResponse;
import com.example.backend.auth.exception.DuplicateAccountException;
import com.example.backend.auth.exception.InvalidCredentialsException;
import com.example.backend.auth.model.UserAccount;
import com.example.backend.auth.security.PasswordHasher;
import com.example.backend.auth.repository.UserAccountRepository;

@Service
public class AuthService {

    private static final Pattern EMAIL_PATTERN = Pattern
            .compile("^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+$");

    private final UserAccountRepository userAccountRepository;
    private final PasswordHasher passwordHasher;

    public AuthService(UserAccountRepository userAccountRepository, PasswordHasher passwordHasher) {
        this.userAccountRepository = userAccountRepository;
        this.passwordHasher = passwordHasher;
    }

    @Transactional
    public RegisterResponse register(RegisterRequest request) {
        requireRequest(request);
        String email = normalizeAndValidateEmail(request.email());
        validatePasswordStrength(request.password());

        if (userAccountRepository.existsByEmail(email)) {
            throw new DuplicateAccountException("An account with this email already exists.");
        }

        UserAccount account = new UserAccount(email, passwordHasher.hash(request.password()));
        account = userAccountRepository.save(account);

        return new RegisterResponse(
                "Account created successfully.",
                account.getId().toString(),
                account.getEmail(),
                account.getCreatedAt());
    }

    @Transactional(readOnly = true)
    public LoginResponse login(LoginRequest request) {
        requireRequest(request);
        String email = normalizeAndValidateEmail(request.email());
        String password = requirePassword(request.password());

        UserAccount account = userAccountRepository.findByEmail(email)
                .orElseThrow(() -> new InvalidCredentialsException("Invalid email or password."));

        if (!passwordHasher.matches(password, account.getPasswordHash())) {
            throw new InvalidCredentialsException("Invalid email or password.");
        }

        return new LoginResponse(
                "Login successful.",
                UUID.randomUUID().toString(),
                account.getId().toString(),
                account.getEmail());
    }

    private void requireRequest(Object request) {
        if (request == null) {
            throw new IllegalArgumentException("Request body is required.");
        }
    }

    private String normalizeAndValidateEmail(String email) {
        if (email == null) {
            throw new IllegalArgumentException("Email is required.");
        }

        String normalized = email.trim().toLowerCase(Locale.ROOT);
        if (normalized.isEmpty() || !EMAIL_PATTERN.matcher(normalized).matches()) {
            throw new IllegalArgumentException("Please provide a valid email address.");
        }

        return normalized;
    }

    private void validatePasswordStrength(String password) {
        String required = requirePassword(password);
        if (required.length() < 8) {
            throw new IllegalArgumentException("Password must be at least 8 characters long.");
        }
    }

    private String requirePassword(String password) {
        if (password == null || password.isBlank()) {
            throw new IllegalArgumentException("Password is required.");
        }
        return password;
    }
}
