package com.ddasoom.emergency_service.common.config;

import lombok.Getter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
@Getter
public class MsgApiKeyConfig {

    @Value("${msg.api-key}")
    private String apiKey;

    @Value("${msg.api-secret}")
    private String apiSecret;

    @Value("${msg.send-number}")
    private String sendNumber;
}
