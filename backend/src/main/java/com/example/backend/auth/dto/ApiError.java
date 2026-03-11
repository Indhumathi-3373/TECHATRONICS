package com.example.backend.auth.dto;

import java.time.Instant;

public record ApiError(String message, Instant timestamp) {
}
