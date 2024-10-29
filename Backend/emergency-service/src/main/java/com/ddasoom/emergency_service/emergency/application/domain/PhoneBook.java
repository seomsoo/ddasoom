package com.ddasoom.emergency_service.emergency.application.domain;

public record PhoneBook(
        Long userId,
        String phoneNumber,
        String alias
) {

}
