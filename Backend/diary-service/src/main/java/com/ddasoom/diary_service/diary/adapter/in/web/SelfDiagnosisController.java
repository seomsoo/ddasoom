package com.ddasoom.diary_service.diary.adapter.in.web;

import com.ddasoom.diary_service.common.annotation.WebAdapter;
import com.ddasoom.diary_service.diary.adapter.in.web.request.SaveSelfDiagnosisRequest;
import com.ddasoom.diary_service.diary.application.port.in.SelfDiagnosisUseCase;
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
public class SelfDiagnosisController {

    private final SelfDiagnosisUseCase selfDiagnosisUseCase;

    @PostMapping("/api/diary/self-diagnosis")
    @ResponseStatus(HttpStatus.CREATED)
    public void SaveSelfDiagnosis(@RequestHeader("X-Authenticated-User") Long userId,
            @RequestBody SaveSelfDiagnosisRequest request) {
        selfDiagnosisUseCase.saveSelfDiagnosis(userId, request.panicDoubtCount());
    }
}
