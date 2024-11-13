package com.ddasoom.emergency_service.emergency.adapter.in.web.request;

public record SendMsgRequest(
        String username,
        String[] phoneNumbers
) {

}
