package com.ddasoom.emergency_service.emergency.application.domain;

public record PhoneBook(
        Long phoneBookId,
        Long userId,
        String phoneNumber,
        String alias
) {

    public PhoneBook(Long userId, String phoneNumber, String alias) {
        this(null, userId, phoneNumber, alias);
    }
}
