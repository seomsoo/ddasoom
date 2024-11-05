package com.ddasoom.voice_service.voice.adapter.out.elevenlabs;

import static lombok.AccessLevel.PRIVATE;
import static org.springframework.http.MediaType.APPLICATION_JSON;
import static org.springframework.http.MediaType.MULTIPART_FORM_DATA;

import com.ddasoom.voice_service.voice.adapter.out.elevenlabs.request.TextToSpeechRequest;
import com.ddasoom.voice_service.voice.adapter.out.elevenlabs.request.TrainAiVoiceRequest;
import com.ddasoom.voice_service.voice.adapter.out.elevenlabs.response.TrainAiVoiceResponse;
import lombok.NoArgsConstructor;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestClient;

@NoArgsConstructor(access = PRIVATE)
public abstract class ElevenLabsRequestUtils {

    private static final RestClient restClient;

    static {
        restClient = RestClient.builder()
                .baseUrl("https://api.elevenlabs.io")
                .defaultHeader("xi-api-key", "sk_2ff2c593c65116b4f22f94c7ae2a77b77986f005c314683e")
                .build();
    }

    public static TrainAiVoiceResponse sendRequest(TrainAiVoiceRequest request) {
        MultiValueMap<String, Object> body = new LinkedMultiValueMap<>();
        body.add("name", request.getName());
        request.getFiles().forEach(file -> body.add("files", file));

        return restClient.post()
                .uri("/v1/voices/add")
                .contentType(MULTIPART_FORM_DATA)
                .body(body)
                .retrieve()
                .body(TrainAiVoiceResponse.class);
    }

    public static byte[] sendRequest(String voiceKey, TextToSpeechRequest request) {
        return restClient.post()
                .uri("/v1/text-to-speech/" + voiceKey)
                .contentType(APPLICATION_JSON)
                .body(request)
                .retrieve()
                .body(byte[].class);
    }
}
