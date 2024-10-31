package com.ddasoom.voice_service.voice.application.port.out;

import com.ddasoom.voice_service.voice.application.domain.SoundFile;
import java.util.List;

public interface UploadSoundFilePort {

    void uploadSoundFile(List<SoundFile> files);
}
