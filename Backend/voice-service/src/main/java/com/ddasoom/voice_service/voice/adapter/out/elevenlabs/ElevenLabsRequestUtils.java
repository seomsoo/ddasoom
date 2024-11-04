package com.ddasoom.voice_service.voice.adapter.out.elevenlabs;

import static org.springframework.http.HttpHeaders.CONTENT_TYPE;
import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;
import static org.springframework.http.MediaType.MULTIPART_FORM_DATA;

import com.ddasoom.voice_service.voice.adapter.out.elevenlabs.request.TextToSpeechRequest;
import com.ddasoom.voice_service.voice.adapter.out.elevenlabs.request.TrainAiVoiceRequest;
import com.ddasoom.voice_service.voice.adapter.out.elevenlabs.response.TextToSpeechResponse;
import com.ddasoom.voice_service.voice.adapter.out.elevenlabs.response.TrainAiVoiceResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestClient;

@Component
@RequiredArgsConstructor
public class ElevenLabsRequestUtils {

    private final RestClient restClient;

    public TrainAiVoiceResponse sendRequest(TrainAiVoiceRequest request) {
        MultiValueMap<String, Object> body = new LinkedMultiValueMap<>();
        body.add("name", request.getName());
        request.getFiles().stream()
                .forEach(file -> body.add("files", file));

        return restClient.post()
                .uri("/v1/voices/add")
                .contentType(MULTIPART_FORM_DATA)
                .body(body)
                .retrieve()
                .body(TrainAiVoiceResponse.class);
    }

    public TextToSpeechResponse sendRequest(String voiceKey, TextToSpeechRequest request) {
        return restClient.post()
                .uri("/v1/text-to-speech/" + voiceKey)
                .header(CONTENT_TYPE, APPLICATION_JSON_VALUE)
                .body(request)
                .retrieve()
                .body(TextToSpeechResponse.class);
    }
}
