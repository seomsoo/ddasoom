package com.ddasoom.voice_service.voice.application.port.in;

import static com.ddasoom.voice_service.common.util.ValidationUtils.validate;

import com.ddasoom.voice_service.voice.application.domain.Voice;
import jakarta.validation.constraints.NotNull;
import java.util.List;

public record CreateVoiceCommand(
        @NotNull Long userId,
        @NotNull String voiceName,
        @NotNull List<Voice> voices
) {

    public CreateVoiceCommand(Long userId, String voiceName, List<Voice> voices) {
        this.userId = userId;
        this.voiceName = voiceName;
        this.voices = voices;

        validate(this);
    }
}
