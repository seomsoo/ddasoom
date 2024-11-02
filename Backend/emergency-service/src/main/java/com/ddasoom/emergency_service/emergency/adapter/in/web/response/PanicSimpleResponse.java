package com.ddasoom.emergency_service.emergency.adapter.in.web.response;

import java.time.LocalDateTime;

public record PanicSimpleResponse(
        Long panicId,
        LocalDateTime startDate,
        Integer duration,
        String address
) {

}
