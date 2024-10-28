package com.ddasoom.user_service.user.application.port.in;

public record JoinCommand(
        String email,
        String name
) {

}
