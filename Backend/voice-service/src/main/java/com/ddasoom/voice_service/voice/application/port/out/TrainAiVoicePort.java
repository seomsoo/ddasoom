package com.ddasoom.voice_service.voice.application.port.out;

import com.ddasoom.voice_service.voice.application.domain.Voice;
import java.util.List;

public interface TrainAiVoicePort {

    String trainAiVoice(List<Voice> voices);
}
