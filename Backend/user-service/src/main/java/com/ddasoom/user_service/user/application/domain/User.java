package com.ddasoom.user_service.user.application.domain;

public record User(
        Long id,
        String email,
        String name
) {

    public User(String email, String name) {
        this(null, email, name);
    }
}
