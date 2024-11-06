package com.ddasoom.user_service.user.adapter.out.diary;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;

@FeignClient(name = "DIARY-SERVICE")
public interface DiaryServiceClient {

    @GetMapping("/api/diary/training/continuous-day")
    GetTrainingContinuousDaysResponse getContinuousTrainingDays(@RequestHeader("X-Authenticated-User") Long userId);
}
