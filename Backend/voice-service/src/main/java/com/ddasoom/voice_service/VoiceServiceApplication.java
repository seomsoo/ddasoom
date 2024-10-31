package com.ddasoom.voice_service;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableAsync;

@EnableAsync
@SpringBootApplication
public class VoiceServiceApplication {

    public static void main(String[] args) {
        SpringApplication.run(VoiceServiceApplication.class, args);
    }

}
