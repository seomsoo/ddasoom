package com.ddasoom.voice_service.voice.adapter.out.elevenlabs;

import com.fasterxml.jackson.databind.PropertyNamingStrategies.SnakeCaseStrategy;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import lombok.Data;

@Data
@JsonNaming(SnakeCaseStrategy.class)
public class TextToSpeechRequest {

    private String text;
    private String modelId;

    public TextToSpeechRequest(String text) {
        this.text = text;
        this.modelId = "eleven_multilingual_v2";
    }
}
