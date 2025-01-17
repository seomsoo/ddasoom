package com.ddasoom.diary_service.diary.adapter.in.web;

import static com.ddasoom.diary_service.common.util.ApiUtils.success;

import com.ddasoom.diary_service.common.annotation.WebAdapter;
import com.ddasoom.diary_service.common.util.ApiUtils.ApiResult;
import com.ddasoom.diary_service.diary.adapter.in.web.request.TrainingRecordSaveRequest;
import com.ddasoom.diary_service.diary.adapter.in.web.response.GetContinuousTrainingDaysResponse;
import com.ddasoom.diary_service.diary.adapter.in.web.response.GetTodayTrainingResponse;
import com.ddasoom.diary_service.diary.adapter.out.training.statistics.TrainingStatisticsSchedulerAdapter;
import com.ddasoom.diary_service.diary.application.port.in.TrainingUseCase;
import jakarta.validation.Valid;
import java.time.LocalDate;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@WebAdapter
@RestController
@RequiredArgsConstructor
public class TrainingController {

    private final TrainingUseCase trainingUseCase;
    private final TrainingStatisticsSchedulerAdapter trainingStatisticsSchedulerAdapter;

    @PostMapping("/api/diary/training")
    @ResponseStatus(HttpStatus.CREATED)
    public void saveTrainingRecord(@RequestHeader("X-Authenticated-User") Long userId,
            @Valid @RequestBody TrainingRecordSaveRequest request) {
        trainingUseCase.saveTrainingRecord(userId, request.trainingType());
    }

    @GetMapping("/api/diary/training/continuous-day")
    public GetContinuousTrainingDaysResponse getContinuousTrainingDays(
            @RequestHeader("X-Authenticated-User") Long userId) {
        return trainingUseCase.getContinuousTrainingDays(userId);
    }

    @PostMapping("/api/diary/training/continuous-day/validation")
    public void checkValidAndUpdateContinuousTrainingDays() {
        trainingStatisticsSchedulerAdapter.checkValidAndUpdate();
    }

    @GetMapping("/api/diary/training/today")
    public ApiResult<GetTodayTrainingResponse> getTodayTraining(@RequestHeader("X-Authenticated-User") Long userId) {
        return success(trainingUseCase.getTodayTraining(userId, LocalDate.now()));
    }
}
