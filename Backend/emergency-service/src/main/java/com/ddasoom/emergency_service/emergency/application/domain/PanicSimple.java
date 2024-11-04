package com.ddasoom.emergency_service.emergency.application.domain;

import java.time.LocalDateTime;

public record PanicSimple(
        Long panicId,
        LocalDateTime startDate,
        Integer duration,
        String address
) {

}
