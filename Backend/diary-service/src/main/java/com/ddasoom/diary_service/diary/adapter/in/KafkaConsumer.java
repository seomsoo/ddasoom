package com.ddasoom.diary_service.diary.adapter.in;

import com.ddasoom.diary_service.diary.application.port.in.PanicCommand;
import com.ddasoom.diary_service.diary.application.port.in.PanicDescriptionCommand;
import com.ddasoom.diary_service.diary.application.port.in.PanicUseCase;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class KafkaConsumer {

    private final PanicUseCase panicUseCase;

    @KafkaListener(topics = "panic")
    public void savePanic(String kafkaMessage) throws JsonProcessingException {
        Map<String, Object> map = new HashMap<>();
        ObjectMapper mapper = new ObjectMapper();
        mapper.registerModule(new JavaTimeModule());

        map = mapper.readValue(kafkaMessage, new TypeReference<Map<String, Object>>() {});

        PanicCommand command = new PanicCommand(
                ((Number) map.get("userId")).longValue(),
                mapper.convertValue(map.get("startDate"), LocalDateTime.class),
                (Integer) map.get("duration"),
                new BigDecimal(map.get("latitude").toString()),
                new BigDecimal(map.get("longitude").toString()),
                (String) map.get("address"),
                (String) map.get("description")
        );

        panicUseCase.savePanic(command);
    }

    @KafkaListener(topics = "panic-description")
    public void savePanicDescription(String kafkaMessage) throws JsonProcessingException {
        Map<String, Object> map = new HashMap<>();
        ObjectMapper mapper = new ObjectMapper();

        map = mapper.readValue(kafkaMessage, new TypeReference<Map<String, Object>>() {});

        PanicDescriptionCommand command = new PanicDescriptionCommand(
                ((Number) map.get("panicId")).longValue(),
                (String) map.get("description")
        );

        panicUseCase.savePanicDescription(command);
    }
}
