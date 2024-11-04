package com.ddasoom.voice_service.voice.adapter.out.elevenlabs;

import com.ddasoom.voice_service.voice.application.domain.SoundFile;
import com.ddasoom.voice_service.voice.application.domain.Voice;
import com.ddasoom.voice_service.voice.application.port.out.ConvertTextScriptToSoundPort;
import com.ddasoom.voice_service.voice.application.port.out.TrainAiVoicePort;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

@Component
@RequiredArgsConstructor
public class ElevenLabsAiVoiceAdapter implements TrainAiVoicePort, ConvertTextScriptToSoundPort {

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

    @Override
    public List<SoundFile> convertTextScriptToSoundPort(String voiceKey) {
        Map<String, String> scripts = new HashMap<>();

        scripts.put("GROUNDING-001", "지금 보이는 이미지는 무엇인가요?");
        scripts.put("GROUNDING-002", "가장 먼저 보인 색깔은 무슨 색인가요?");
        scripts.put("GROUNDING-003", "눈앞에 보이는 게 가볍게 느껴지나요? 무겁게 느껴지나요?");
        scripts.put("GROUNDING-004", "지금 보이는 이미지는 차가운 느낌인가요, 따뜻한 느낌인가요?");
        scripts.put("GROUNDING-005", "가장 먼저 눈에 띈 것은 무엇인가요? 어떤 감정이 떠오르나요?");

        scripts.put("GROUNDING-006", "지금 들리는 소리는 무엇인가요?");
        scripts.put("GROUNDING-007", "지금 들리는 소리의 높낮이는 어떠한가요?");
        scripts.put("GROUNDING-008", "이 소리가 차분하게 들리나요, 아니면 활기차게 느껴지나요?");
        scripts.put("GROUNDING-009", "소리가 점점 커지나요, 아니면 작아지고 있나요?");

        scripts.put("GROUNDING-010", "지금 밟고 있는 곳은 푹신한가요 단단한가요?");
        scripts.put("GROUNDING-011", "지금 주변에서 들리는 소리는 무엇인가요?");
        scripts.put("GROUNDING-012", "지금 어떤 냄새가 나나요?");
        scripts.put("GROUNDING-013", "입안의 작은 맛을 그대로 느껴보세요. 어떤 맛이 느껴지나요?");
        scripts.put("GROUNDING-014", "지금 손끝에 닿는 감촉은 어떤가요? 그대로 느껴보세요.");

        scripts.put("EMERGENCY-001", "지금 숨을 잘 쉬고 있어. 숨이 들어오고 나가는 걸 천천히 느껴봐.");
        scripts.put("EMERGENCY-002", "눈을 감지 말고 지금 눈에 보이는 것 한 가지만 말해봐.");
        scripts.put("EMERGENCY-003", "바닥에 발이 닿는 느낌을 느껴봐. 천천히 발바닥으로 땅을 짚고 있는 걸 확인해 봐.");
        scripts.put("EMERGENCY-004", "주변에서 들리는 소리 하나에 집중해봐.");
        scripts.put("EMERGENCY-005", "바람을 느껴봐. 바람이 스쳐지나가는 걸 느껴봐.");
        scripts.put("EMERGENCY-006", "주먹을 꽉 쥐었다 풀어봐.");
        scripts.put("EMERGENCY-007", "눈을 감고 손을 움직여봐. 지금 손끝에 느껴지는 감촉을 느껴봐.");

        scripts.put("EMERGENCY-008", "괜찮아, 넌 지금 안전한 공간에 있어. 주변엔 너를 안전하게 지켜줄 수 있는 게 있어.");
        scripts.put("EMERGENCY-009", "지금 느껴지는 감정들은 잠시 나타났다가 지나가는 거야.");
        scripts.put("EMERGENCY-010", "지금 느껴지는 불안함은 곧 사라지고 시간과 함께 흘러갈거야.");
        scripts.put("EMERGENCY-011", "네 숨소리에 집중해봐. 마음이 조금씩 가라앉을거야.");
        scripts.put("EMERGENCY-012", "이 순간에만 집중하며, 자연스럽게 흘려보내봐. 그럴수록 편안해질거야.");

        scripts.put("EMERGENCY-013", "지금 이 순간을 잘 견디고 있어.");
        scripts.put("EMERGENCY-014", "지금처럼 차분히, 한 걸음씩 나아가고 있어. 잘 해내고 있어.");
        scripts.put("EMERGENCY-015", "다음에도 이렇게 극복할 수 있을 거야.");
        scripts.put("EMERGENCY-016", "난 너를 믿어. 너는 최선을 다하고 있어.");
        scripts.put("EMERGENCY-017", "너를 믿고 응원하는 사람들이 있다는 걸 잊지 마. 우리는 언제나 네 곁에 있어.");
        scripts.put("EMERGENCY-018", "이 순간이 지나가면, 너는 한 층 더 단단해져있을거야.");

        return scripts.entrySet().stream()
                .map(script -> convert(voiceKey, script.getKey(), script.getValue()))
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
