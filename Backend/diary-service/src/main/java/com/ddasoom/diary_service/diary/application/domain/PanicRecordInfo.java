package com.ddasoom.diary_service.diary.application.domain;

import java.time.LocalDateTime;

public record PanicRecordInfo(LocalDateTime startDate,
                              int duration,
                              String address,
                              String description) {

}
