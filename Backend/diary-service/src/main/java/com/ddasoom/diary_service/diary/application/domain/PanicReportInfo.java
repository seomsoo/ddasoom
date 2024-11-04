package com.ddasoom.diary_service.diary.application.domain;

import java.time.LocalDateTime;

public record PanicReportInfo(LocalDateTime startDate,
                              int duration) {

}
