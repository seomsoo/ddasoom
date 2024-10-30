package com.ddasoom.diary_service.diary.application.domain;

import java.time.LocalDateTime;
import lombok.Builder;

@Builder
public record PanicRecordInfo(LocalDateTime startDate,
                              int duration,
                              double latitude,
                              double longitude,
                              String address,
                              String description) {
    //TODO: 주소 변환 (역지오코딩)
    
}
