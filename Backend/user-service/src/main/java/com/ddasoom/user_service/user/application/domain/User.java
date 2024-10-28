package com.ddasoom.user_service.user.application.domain;

public record User(
        Long id,
        String email,
        String name
) {

}
