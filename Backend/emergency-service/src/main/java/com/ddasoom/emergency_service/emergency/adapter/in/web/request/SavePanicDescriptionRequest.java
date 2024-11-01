package com.ddasoom.emergency_service.emergency.adapter.in.web.request;

public record SavePanicDescriptionRequest(
        Long panicId,
        String description
) {

}
