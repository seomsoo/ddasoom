package com.ddasoom.diary_service.diary.application.domain;

import java.time.LocalDateTime;

public record PanicSimple(
        Long panicId,
        LocalDateTime starDate,
        Integer duration,
        String address
) {

}
