package com.ddasoom.voice_service.voice.adapter.out.elevenlabs;

import static com.ddasoom.voice_service.voice.adapter.out.elevenlabs.SpeechScript.speechScripts;

import com.ddasoom.voice_service.voice.adapter.out.elevenlabs.request.TextToSpeechRequest;
import com.ddasoom.voice_service.voice.adapter.out.elevenlabs.request.TrainAiVoiceRequest;
import com.ddasoom.voice_service.voice.adapter.out.elevenlabs.response.TextToSpeechResponse;
import com.ddasoom.voice_service.voice.adapter.out.elevenlabs.response.TrainAiVoiceResponse;
import com.ddasoom.voice_service.voice.application.domain.SoundFile;
import com.ddasoom.voice_service.voice.application.domain.Voice;
import com.ddasoom.voice_service.voice.application.port.out.ConvertTextScriptToSoundPort;
import com.ddasoom.voice_service.voice.application.port.out.TrainAiVoicePort;
import java.util.List;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class ElevenLabsAiVoiceAdapterV2 implements TrainAiVoicePort, ConvertTextScriptToSoundPort {

    private final ElevenLabsRequestUtils elevenLabsRequestUtils;

    @Override
    public String trainAiVoice(List<Voice> voices) {
        List<ByteArrayResource> voiceFiles = voices.stream()
                .map(this::convertByteArrayToResource)
                .toList();

        TrainAiVoiceResponse response = elevenLabsRequestUtils.sendRequest(
                new TrainAiVoiceRequest(UUID.randomUUID().toString(), voiceFiles)
        );

        return response.voiceId();
    }

    @Override
    public List<SoundFile> convertTextScriptToSoundPort(String voiceKey) {
        return speechScripts().stream()
                .map(script -> getSoundFile(voiceKey, script))
                .toList();
    }

    private ByteArrayResource convertByteArrayToResource(Voice voice) {
        return new ByteArrayResource(voice.bytes()) {

            @Override
            public String getFilename() {
                return "uploaded-file-" + System.currentTimeMillis();
            }
        };
    }

    private SoundFile getSoundFile(String voiceKey, Script script) {
        TextToSpeechResponse response = elevenLabsRequestUtils.sendRequest(
                voiceKey,
                new TextToSpeechRequest(script.message())
        );

        return new SoundFile(
                String.format("%s-%s.mp3", voiceKey, script.code()),
                response.bytes()
        );
    }
}
