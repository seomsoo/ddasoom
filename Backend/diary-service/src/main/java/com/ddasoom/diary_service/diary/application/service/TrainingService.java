package com.ddasoom.diary_service.diary.application.service;

import static com.ddasoom.diary_service.diary.application.domain.TrainingType.validateNoneMatching;

import com.ddasoom.diary_service.common.annotation.UseCase;
import com.ddasoom.diary_service.diary.adapter.in.web.response.GetContinuousTrainingDaysResponse;
import com.ddasoom.diary_service.diary.adapter.in.web.response.GetTodayTrainingResponse;
import com.ddasoom.diary_service.diary.adapter.out.ddasomiInfo.DdasomiInfoServiceClient;
import com.ddasoom.diary_service.diary.application.port.in.TrainingUseCase;
import com.ddasoom.diary_service.diary.application.port.out.TrainingRecordPort;
import com.ddasoom.diary_service.diary.application.port.out.TrainingStatisticsPort;
import com.ddasoom.diary_service.diary.error.TrainingTypeBadRequestException;
import java.time.LocalDate;
import lombok.RequiredArgsConstructor;
import org.springframework.transaction.annotation.Transactional;

@UseCase
@Transactional
@RequiredArgsConstructor
public class TrainingService implements TrainingUseCase {

    private final TrainingRecordPort trainingRecordPort;
    private final TrainingStatisticsPort trainingStatisticsPort;
    private final DdasomiInfoServiceClient dasomiInfoServiceClient;

    @Override
    public void saveTrainingRecord(Long userId, String trainingType) {
        if (validateNoneMatching(trainingType)) {
            throw new TrainingTypeBadRequestException();
        }

        //이미 저장된 기록이 있으면 저장 안함.
        if (trainingRecordPort.existTrainingRecordBy(userId, trainingType, LocalDate.now())) {
            return;
        }

        trainingRecordPort.saveTrainingRecord(userId, trainingType);
        dasomiInfoServiceClient.updateDdasomiInfo(userId, trainingType);
    }

    @Override
    public GetContinuousTrainingDaysResponse getContinuousTrainingDays(Long userId) {
        Integer continuousDay = trainingStatisticsPort.findContinueDayByUserId(userId).orElse(0);

        //오늘 훈련기록은 통계 테이블의 연속 훈련 일수에 포함되어 있지 않음.
        //따라서 오늘 훈련했다면 연속일 수에 포함시켜주기 위해 증가
        if (trainingRecordPort.existTrainingBy(userId, LocalDate.now())) {
            continuousDay++;
        }
        return new GetContinuousTrainingDaysResponse(continuousDay);
    }

    @Override
    public GetTodayTrainingResponse getTodayTraining(Long userId, LocalDate today) {
        return GetTodayTrainingResponse.from(
                trainingRecordPort.getTrainingRecord(userId, today.getYear(), today.getMonthValue(),
                        today.getDayOfMonth())
        );
    }
}
