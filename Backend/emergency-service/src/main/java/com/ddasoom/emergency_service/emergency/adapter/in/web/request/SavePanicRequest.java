package com.ddasoom.emergency_service.emergency.adapter.in.web.request;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import lombok.Getter;

@Getter
public class SavePanicRequest {

    Long userId;
    LocalDateTime startDate;
    int duration;
    BigDecimal latitude;
    BigDecimal longitude;
    String address;

    public void setUserId(Long userId) {
        this.userId = userId;
    }
}
