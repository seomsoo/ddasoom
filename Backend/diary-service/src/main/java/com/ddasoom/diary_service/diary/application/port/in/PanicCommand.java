package com.ddasoom.diary_service.diary.application.port.in;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public record PanicCommand(
        Long userId,
        LocalDateTime startDate,
        int duration,
        BigDecimal latitude,
        BigDecimal longitude,
        String address,
        String description
) {

}
