package com.ddasoom.emergency_service.emergency.adapter.in.web.response;

public record PhoneBookResponse(
        Long PhoneBookId,
        Long userId,
        String PhoneNumber,
        String alias
) {

}
