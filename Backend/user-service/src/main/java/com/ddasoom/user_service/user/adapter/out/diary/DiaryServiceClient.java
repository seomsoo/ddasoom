package com.ddasoom.user_service.user.adapter.out.diary;

import feign.Headers;
import feign.Param;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;

@FeignClient(name = "DIARY-SERVICE")
public interface DiaryServiceClient {

    @Headers("X-Authenticated-User: {userId}")
    @GetMapping("/api/diary/training/continuous-day")
    GetTrainingContinuousDaysResponse getContinuousTrainingDays(@Param("userId") Long userId);
}
