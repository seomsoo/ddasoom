package com.ddasoom.voice_service.voice.adapter.out.elevenlabs;

import com.ddasoom.voice_service.voice.adapter.out.elevenlabs.request.TextToSpeechRequest;
import com.ddasoom.voice_service.voice.application.domain.SoundFile;
import com.ddasoom.voice_service.voice.application.domain.Voice;
import com.ddasoom.voice_service.voice.application.port.out.ConvertTextScriptToSoundPort;
import com.ddasoom.voice_service.voice.application.port.out.TrainAiVoicePort;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.util.List;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestClient;
import org.springframework.web.client.RestTemplate;

//@Component
@RequiredArgsConstructor
public class ElevenLabsAiVoiceAdapter implements TrainAiVoicePort, ConvertTextScriptToSoundPort {

    private final ObjectMapper objectMapper;
    private final RestTemplate restTemplate;

    private final RestClient restClient;

    @Override
    public String trainAiVoice(List<Voice> voices) {
        // API URL
        String url = "https://api.elevenlabs.io/v1/voices/add";

        // 데이터 설정
        MultiValueMap<String, Object> body = new LinkedMultiValueMap<>();
        body.add("name", UUID.randomUUID().toString());

        for (Voice voice : voices) {
            ByteArrayResource fileResource = new ByteArrayResource(voice.bytes()) {
                @Override
                public String getFilename() {
                    return "uploaded-file-" + System.currentTimeMillis(); // 파일 이름 지정
                }
            };
            body.add("files", fileResource);
        }

        String response = restClient.post()
                .uri(url)
                .header(HttpHeaders.CONTENT_TYPE, MediaType.MULTIPART_FORM_DATA_VALUE)
                .header("xi-api-key", "sk_2ff2c593c65116b4f22f94c7ae2a77b77986f005c314683e")
                .body(body)
                .retrieve()
                .body(String.class);

        try {
            return objectMapper.readTree(response)
                    .get("voice_id")
                    .asText();
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public List<SoundFile> convertTextScriptToSoundPort(String voiceKey) {
        List<Script> scripts = SpeechScript.speechScripts();

        return scripts.stream()
                .map(script -> convert(voiceKey, script.code(), script.message()))
                .toList();
    }

    private SoundFile convert(String voiceKey, String code, String script) {
        String url = "https://api.elevenlabs.io/v1/text-to-speech/" + voiceKey;

        // 헤더 설정
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.set("xi-api-key", "sk_2ff2c593c65116b4f22f94c7ae2a77b77986f005c314683e");

        // JSON 본문 설정
        String requestJson = null;
        try {
            String format = objectMapper.writeValueAsString(new TextToSpeechRequest(script));
            requestJson = String.format(format);
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }

        // HttpEntity 생성
        HttpEntity<String> entity = new HttpEntity<>(requestJson, headers);

        // 요청 전송 및 응답 받기
        ResponseEntity<byte[]> response = restTemplate.exchange(url, HttpMethod.POST, entity, byte[].class);

        // 상태 코드 확인 후 바이트 배열로 반환
        if (response.getStatusCode().is2xxSuccessful()) {
            return new SoundFile(String.format("%s-%s.mp3", voiceKey, code), response.getBody());
        } else {
            throw new RuntimeException("Failed to retrieve audio data: " + response.getStatusCode());
        }
    }
}
