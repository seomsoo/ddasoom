package com.ddasoom.emergency_service.emergency.application.port.in;

public record SendMsgCommand(
        String username,
        String[] phoneNumbers
) {

}
