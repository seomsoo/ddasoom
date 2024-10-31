package com.ddasoom.voice_service.voice.adapter.out;

import com.ddasoom.voice_service.common.annotation.PersistenceAdapter;
import com.ddasoom.voice_service.voice.application.port.out.CreateVoicePort;
import lombok.RequiredArgsConstructor;

@PersistenceAdapter
@RequiredArgsConstructor
public class VoicePersistenceAdapter implements CreateVoicePort {

    private final VoiceRepository voiceRepository;

    @Override
    public void createVoice(Long userId, String voiceName, String voiceKey) {
        voiceRepository.save(
                creaetVoiceJpaEntity(userId, voiceName, voiceKey)
        );
    }

    private VoiceJpaEntity creaetVoiceJpaEntity(Long userId, String voiceName, String voiceKey) {
        return VoiceJpaEntity.builder()
                .userId(userId)
                .voiceName(voiceName)
                .voiceKey(voiceKey)
                .build();
    }
}
