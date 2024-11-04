package com.ddasoom.voice_service.voice.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestClient;

@Configuration
public class ElevenLabsRestClientConfig {

    @Bean
    public RestClient restClient(RestClient.Builder builder) {
        return builder.baseUrl("https://api.elevenlabs.io")
                .defaultHeader("xi-api-key", "sk_2ff2c593c65116b4f22f94c7ae2a77b77986f005c314683e")
                .build();
    }
}
