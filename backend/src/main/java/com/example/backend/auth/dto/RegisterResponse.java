package com.example.backend.auth.dto;

import java.time.Instant;

public record RegisterResponse(String message, String userId, String email, Instant createdAt) {
}
