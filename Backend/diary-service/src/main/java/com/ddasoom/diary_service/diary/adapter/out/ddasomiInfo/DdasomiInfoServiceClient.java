package com.ddasoom.diary_service.diary.adapter.out.ddasomiInfo;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestHeader;

@FeignClient(name = "USER-SERVICE")
public interface DdasomiInfoServiceClient {

    @PutMapping("/api/users/exp-up")
    void updateDdasomiExperience(@RequestHeader("X-Authenticated-User") Long userId);

}
