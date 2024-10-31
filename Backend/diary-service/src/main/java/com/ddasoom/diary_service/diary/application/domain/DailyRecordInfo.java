package com.ddasoom.diary_service.diary.application.domain;

import lombok.Builder;

@Builder
public record DailyRecordInfo(boolean alcohol,
                              boolean caffeine,
                              boolean smoking,
                              boolean exercise,
                              String description) {

}
