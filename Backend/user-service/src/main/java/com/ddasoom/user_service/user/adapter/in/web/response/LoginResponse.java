package com.ddasoom.user_service.user.adapter.in.web.response;

public record LoginResponse(
        Long userId,
        String name,
        String token
) {

}
