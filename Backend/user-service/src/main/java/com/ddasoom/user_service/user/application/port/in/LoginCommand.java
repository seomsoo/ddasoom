package com.ddasoom.user_service.user.application.port.in;

public record LoginCommand(
        String email,
        String name
) {

}
