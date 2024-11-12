package com.ddasoom.voice_service.voice.adapter.in.event;

import com.ddasoom.voice_service.voice.application.domain.Voice;
import java.util.List;

public record CreateVoiceEvent(
        Long userId,
        String voiceName,
        List<Voice> voices
) {

}
