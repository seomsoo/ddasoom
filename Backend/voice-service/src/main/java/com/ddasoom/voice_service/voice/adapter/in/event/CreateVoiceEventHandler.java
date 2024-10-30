package com.ddasoom.voice_service.voice.adapter.in.event;

import com.ddasoom.voice_service.voice.application.domain.Voice;
import com.ddasoom.voice_service.voice.application.port.in.CreateVoiceCommand;
import com.ddasoom.voice_service.voice.application.port.in.CreateVoiceUseCase;
import java.io.IOException;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.context.event.EventListener;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

@Component
@RequiredArgsConstructor
public class CreateVoiceEventHandler {

    private final CreateVoiceUseCase createVoiceUseCase;

    @Async
    @EventListener
    public void createVoice(CreateVoiceEvent event) {
        createVoiceUseCase.createVoice(
                new CreateVoiceCommand(event.userId(), event.voiceName(), mapToVoices(event.voices()))
        );
    }

    private List<Voice> mapToVoices(List<MultipartFile> voices) {
        return voices.stream()
                .map(this::mapToVoice)
                .toList();
    }

    private Voice mapToVoice(MultipartFile voice) {
        try {
            return new Voice(voice.getBytes());
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }
}
