package com.ddasoom.diary_service.diary.application.domain;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import lombok.Builder;

public record PanicRecordInfo(Long userId,
                              LocalDateTime startDate,
                              int duration,
                              BigDecimal latitude,
                              BigDecimal longitude,
                              String address,
                              String description) {

    @Builder
    public PanicRecordInfo(LocalDateTime startDate, int duration, BigDecimal latitude, BigDecimal longitude,
            String address,
            String description) {
        this(null, startDate, duration, latitude, longitude, address, description);
    }

    public PanicRecordInfo(Long userId, int duration, BigDecimal latitude,
                           BigDecimal longitude, String address, String description) {
        this(userId, null, duration, latitude, longitude, address, description);
    }

    //TODO: 주소 변환 (역지오코딩)
}