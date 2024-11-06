package com.ddasoom.emergency_service.emergency.adapter.out.client;

import com.ddasoom.emergency_service.emergency.adapter.in.web.request.PanicSimpleRequest;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name = "DIARY-SERVICE")
public interface DiaryServiceClient {

    @GetMapping("/api/diary/user/{userId}/panic-simple")
    PanicSimpleRequest getPanicSimple(@PathVariable("userId") Long userId);
}
