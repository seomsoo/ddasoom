package com.ddasoom.diary_service.diary.adapter.in.web;

import com.ddasoom.diary_service.common.annotation.WebAdapter;
import com.ddasoom.diary_service.diary.adapter.in.web.request.DailyRecordSaveRequest;
import com.ddasoom.diary_service.diary.application.port.in.DailyUseCase;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@WebAdapter
@RestController
@RequiredArgsConstructor
public class DailyController {

    private final DailyUseCase dailyUseCase;

    @PostMapping("/api/diary/daily")
    @ResponseStatus(HttpStatus.CREATED)
    public void saveDailyRecord(@RequestHeader("X-Authenticated-User") Long userId,
            @Valid @RequestBody DailyRecordSaveRequest request) {

        dailyUseCase.saveDailyRecord(userId, request.toCommand());
    }
}
