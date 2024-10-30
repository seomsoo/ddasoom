package com.ddasoom.voice_service.voice.application.service;

import com.ddasoom.voice_service.common.annotation.UseCase;
import com.ddasoom.voice_service.voice.adapter.in.web.response.GetVoiceResponse;
import com.ddasoom.voice_service.voice.application.port.in.GetVoiceQuery;
import com.ddasoom.voice_service.voice.application.port.out.LoadVoicePort;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.transaction.annotation.Transactional;

@UseCase
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class GetVoiceService implements GetVoiceQuery {

    private final LoadVoicePort loadVoicePort;

    @Override
    public List<GetVoiceResponse> getVoicesBy(Long userId) {
        return loadVoicePort.loadVoicesBy(userId).stream()
                .map(voiceInfo -> new GetVoiceResponse(voiceInfo.voiceName(), voiceInfo.voiceKey()))
                .toList();
    }
}
