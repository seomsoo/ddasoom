package com.ddasoom.emergency_service.emergency.adapter.in.web.request;

import java.math.BigDecimal;
import lombok.Getter;

@Getter
public class SavePanicRequest {

    private Long userId;
    private int duration;
    private BigDecimal latitude;
    private BigDecimal longitude;
    private String address;
    private String description;

    public void setUserId(Long userId) {
        this.userId = userId;
    }
}