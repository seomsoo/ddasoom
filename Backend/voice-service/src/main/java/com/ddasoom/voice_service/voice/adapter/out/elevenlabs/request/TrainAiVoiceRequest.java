package com.ddasoom.voice_service.voice.adapter.out.elevenlabs.request;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.core.io.ByteArrayResource;

@Data
@AllArgsConstructor
public class TrainAiVoiceRequest {

    private String name;
    private List<ByteArrayResource> files;
}