package com.ddasoom.emergency_service.emergency.adapter.out;

import com.ddasoom.emergency_service.emergency.adapter.in.web.request.SavePanicDescriptionRequest;
import com.ddasoom.emergency_service.emergency.adapter.in.web.request.SavePanicRequest;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class PanicProducer {

    private final KafkaTemplate<String, String> kafkaTemplate;

    public void send(String topic, SavePanicRequest request) throws JsonProcessingException {
        ObjectMapper mapper = new ObjectMapper();
        String jsonInString = mapper.writeValueAsString(request);
        kafkaTemplate.send(topic, jsonInString);
    }

    public void send(String topic, SavePanicDescriptionRequest request) throws JsonProcessingException {
        ObjectMapper mapper = new ObjectMapper();
        String jsonInString = mapper.writeValueAsString(request);
        kafkaTemplate.send(topic, jsonInString);
    }
}
