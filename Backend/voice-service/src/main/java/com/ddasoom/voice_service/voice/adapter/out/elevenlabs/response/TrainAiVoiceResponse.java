package com.ddasoom.voice_service.voice.adapter.out.elevenlabs.response;

import com.fasterxml.jackson.databind.PropertyNamingStrategies.SnakeCaseStrategy;
import com.fasterxml.jackson.databind.annotation.JsonNaming;

@JsonNaming(SnakeCaseStrategy.class)
public record TrainAiVoiceResponse(
        String voiceId,
        Boolean requiresVerification
) {

}
