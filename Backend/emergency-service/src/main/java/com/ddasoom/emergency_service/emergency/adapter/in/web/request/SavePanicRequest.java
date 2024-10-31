package com.ddasoom.emergency_service.emergency.adapter.in.web.request;

import lombok.Getter;

import java.math.BigDecimal;

@Getter
public class SavePanicRequest {
    private Long userId;
    private int duration;
    private BigDecimal latitude;
    private BigDecimal longitude;
    private String address;

    public void setUserId(Long userId) {
        this.userId = userId;
    }
}
