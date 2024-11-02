package com.ddasoom.emergency_service.emergency.adapter.in.web;

import static com.ddasoom.emergency_service.common.util.ApiUtils.success;
import static org.springframework.http.HttpStatus.CREATED;

import com.ddasoom.emergency_service.common.annotation.WebAdapter;
import com.ddasoom.emergency_service.common.util.ApiUtils.ApiResult;
import com.ddasoom.emergency_service.emergency.adapter.in.web.request.SavePanicDescriptionRequest;
import com.ddasoom.emergency_service.emergency.adapter.in.web.request.SavePanicRequest;
import com.ddasoom.emergency_service.emergency.adapter.in.web.response.PanicSimpleResponse;
import com.ddasoom.emergency_service.emergency.adapter.out.PanicProducer;
import com.ddasoom.emergency_service.emergency.application.port.in.PanicUseCase;
import com.fasterxml.jackson.core.JsonProcessingException;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
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
    private final PanicUseCase panicUseCase;

    @ResponseStatus(CREATED)
    @PostMapping("/api/emergency/panic")
    public void savePanic(@RequestHeader("X-Authenticated-User") Long userId,
            @RequestBody SavePanicRequest request) throws JsonProcessingException {

        request.setUserId(userId);
        producer.send("panic", request);
    }

    @PatchMapping("/api/emergency/panic/description")
    public void savePanicDescription(@RequestHeader("X-Authenticated-User") Long userId,
            @RequestBody SavePanicDescriptionRequest request) throws JsonProcessingException {

        producer.send("panic-description", request);
    }

    @GetMapping("/api/emergency/panic-simple")
    public ApiResult<PanicSimpleResponse> getPanicSimple(@RequestHeader("X-Authenticated-User") Long userId) {
        return success(panicUseCase.getPanicSimple(userId));
    }
}
