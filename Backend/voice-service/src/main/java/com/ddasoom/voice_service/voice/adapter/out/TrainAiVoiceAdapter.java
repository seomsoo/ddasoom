package com.ddasoom.voice_service.voice.adapter.out;

import com.ddasoom.voice_service.voice.application.domain.Voice;
import com.ddasoom.voice_service.voice.application.port.out.TrainAiVoicePort;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.util.List;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

@Component
@RequiredArgsConstructor
public class TrainAiVoiceAdapter implements TrainAiVoicePort {

    private final ObjectMapper objectMapper;
    private final RestTemplate restTemplate;

    @Override
    public String trainAiVoice(List<Voice> voices) {
        // API URL
        String url = "https://api.elevenlabs.io/v1/voices/add";

        // 헤더 설정
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.MULTIPART_FORM_DATA);
        headers.set("xi-api-key", "sk_2ff2c593c65116b4f22f94c7ae2a77b77986f005c314683e");

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

        // HttpEntity 생성
        HttpEntity<MultiValueMap<String, Object>> requestEntity = new HttpEntity<>(body, headers);

        // 요청 보내기
        ResponseEntity<String> response = restTemplate.postForEntity(url, requestEntity, String.class);

        try {
            return objectMapper.readTree(response.getBody())
                    .get("voice_id")
                    .asText();
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }
    }
}
