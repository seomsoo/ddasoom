package com.ddasoom.voice_service.voice.application.port.out;

import com.ddasoom.voice_service.voice.application.domain.VoiceInfo;
import java.util.List;

public interface LoadVoicePort {

    List<VoiceInfo> loadVoicesBy(Long userId);
}
