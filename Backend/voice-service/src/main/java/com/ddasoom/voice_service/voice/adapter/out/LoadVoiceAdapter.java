package com.ddasoom.voice_service.voice.adapter.out;

import com.ddasoom.voice_service.common.annotation.PersistenceAdapter;
import com.ddasoom.voice_service.voice.application.domain.VoiceInfo;
import com.ddasoom.voice_service.voice.application.port.out.LoadVoicePort;
import java.util.List;
import lombok.RequiredArgsConstructor;

@PersistenceAdapter
@RequiredArgsConstructor
public class LoadVoiceAdapter implements LoadVoicePort {

    private final VoiceRepository voiceRepository;

    @Override
    public List<VoiceInfo> loadVoicesBy(Long userId) {
        return voiceRepository.findByUserId(userId).stream()
                .map(voice -> new VoiceInfo(voice.getVoiceName(), voice.getVoiceKey()))
                .toList();
    }
}
