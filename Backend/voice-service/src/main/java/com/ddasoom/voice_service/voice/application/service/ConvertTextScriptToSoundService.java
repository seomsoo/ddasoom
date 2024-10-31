package com.ddasoom.voice_service.voice.application.service;

import com.ddasoom.voice_service.common.annotation.UseCase;
import com.ddasoom.voice_service.voice.application.domain.SoundFile;
import com.ddasoom.voice_service.voice.application.port.in.ConvertTextScriptToSoundUseCase;
import com.ddasoom.voice_service.voice.application.port.out.ConvertTextScriptToSoundPort;
import com.ddasoom.voice_service.voice.application.port.out.UploadSoundFilePort;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.transaction.annotation.Transactional;

@UseCase
@Transactional
@RequiredArgsConstructor
public class ConvertTextScriptToSoundService implements ConvertTextScriptToSoundUseCase {

    private final ConvertTextScriptToSoundPort convertTextScriptToSoundPort;
    private final UploadSoundFilePort uploadSoundFilePort;

    @Override
    public void convertTextScriptToSoundUseCase(String voiceKey) {
        List<SoundFile> soundFiles = convertTextScriptToSoundPort.convertTextScriptToSoundPort(voiceKey);
        
        uploadSoundFilePort.uploadSoundFile(soundFiles);
    }
}
