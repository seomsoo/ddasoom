package com.ddasoom.voice_service.voice.adapter.in.web;

import static org.springframework.http.HttpStatus.CREATED;

import com.ddasoom.voice_service.common.annotation.WebAdapter;
import com.ddasoom.voice_service.voice.adapter.in.event.CreateVoiceEvent;
import com.ddasoom.voice_service.voice.application.domain.Voice;
import java.io.IOException;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@WebAdapter
@RestController
@RequiredArgsConstructor
public class CreateVoiceController {

    private final ApplicationEventPublisher eventPublisher;

    @ResponseStatus(CREATED)
    @PostMapping("/api/voices")
    public void createVoice(
            @RequestHeader("X-Authenticated-User") Long userId,
            @RequestPart String voiceName,
            @RequestPart List<MultipartFile> files
    ) {
        eventPublisher.publishEvent(new CreateVoiceEvent(userId, voiceName, mapToVoices(files)));
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
