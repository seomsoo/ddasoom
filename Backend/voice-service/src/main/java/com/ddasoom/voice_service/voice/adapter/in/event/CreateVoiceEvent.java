package com.ddasoom.voice_service.voice.adapter.in.event;

import java.util.List;
import org.springframework.web.multipart.MultipartFile;

public record CreateVoiceEvent(
        Long userId,
        String voiceName,
        List<MultipartFile> voices
) {

}
