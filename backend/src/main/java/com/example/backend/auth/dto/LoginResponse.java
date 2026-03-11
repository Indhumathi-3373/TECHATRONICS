package com.example.backend.auth.dto;

public record LoginResponse(String message, String token, String userId, String email) {
}
