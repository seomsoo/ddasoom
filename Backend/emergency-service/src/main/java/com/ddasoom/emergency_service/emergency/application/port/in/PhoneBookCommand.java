package com.ddasoom.emergency_service.emergency.application.port.in;

public record PhoneBookCommand(
        Long userId,
        String phoneNumber,
        String alias
) {

}
