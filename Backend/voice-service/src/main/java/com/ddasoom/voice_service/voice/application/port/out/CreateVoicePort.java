package com.ddasoom.voice_service.voice.application.port.out;

public interface CreateVoicePort {

    void createVoice(Long userId, String voiceName, String voiceKey);
}
