package com.ddasoom.voice_service.voice.application.domain;

public record SoundFile(
        String fileName,
        byte[] bytes
) {

    public long size() {
        return bytes.length;
    }
}
