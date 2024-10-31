package com.ddasoom.emergency_service.emergency.adapter.in.web;

import static org.springframework.http.HttpStatus.CREATED;

import com.ddasoom.emergency_service.common.annotation.WebAdapter;
import com.ddasoom.emergency_service.emergency.adapter.in.web.request.SavePanicRequest;
import com.ddasoom.emergency_service.emergency.adapter.out.PanicProducer;
import com.fasterxml.jackson.core.JsonProcessingException;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@WebAdapter
@RestController
@RequiredArgsConstructor
public class PanicController {

    private final PanicProducer producer;

    @ResponseStatus(CREATED)
    @PostMapping("/api/emergency/panic")
    public void savePanic(@RequestHeader("X-Authenticated-User") Long userId,
            @RequestBody SavePanicRequest request) throws JsonProcessingException {

        request.setUserId(userId);
        producer.send("panic", request);
    }
}
