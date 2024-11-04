package com.ddasoom.diary_service.diary.adapter.in.web.response;

import java.time.LocalDateTime;

public record PanicSimpleResponse(
        Long panicId,
        LocalDateTime startDate,
        Integer duration,
        String address
) {

}
