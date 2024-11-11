package com.ddasoom.diary_service.diary.adapter.out.ddasomiInfo;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;

@FeignClient(name = "USER-SERVICE")
public interface DdasomiInfoServiceClient {

    @PutMapping("/api/users/daily/exp-up")
    void updateDdasomiInfo(@RequestHeader("X-Authenticated-User") Long userId);

    @PutMapping("/api/users/training/exp-up")
    void updateDdasomiInfo(@RequestHeader("X-Authenticated-User") Long userId, @RequestBody String trainingType);
}
