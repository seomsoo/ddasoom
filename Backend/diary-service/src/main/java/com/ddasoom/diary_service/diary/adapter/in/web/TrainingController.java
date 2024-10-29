package com.ddasoom.diary_service.diary.adapter.in.web;

import com.ddasoom.diary_service.common.annotation.WebAdapter;
import com.ddasoom.diary_service.diary.adapter.in.web.request.TrainingRecordSaveRequest;
import com.ddasoom.diary_service.diary.application.port.in.TrainingUseCase;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

@WebAdapter
@RestController
@RequiredArgsConstructor
public class TrainingController {

    private final TrainingUseCase trainingUseCase;

    @PostMapping("/api/diary/training")
    public void saveTrainingRecord(@RequestHeader("userId") String userId,
            @Valid @RequestBody TrainingRecordSaveRequest request) {
        trainingUseCase.saveTrainingRecord(Long.parseLong(userId), request.trainingType());
    }
}
