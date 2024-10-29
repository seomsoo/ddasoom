package com.ddasoom.diary_service.diary.application.service;

import static com.ddasoom.diary_service.diary.application.domain.TrainingType.validateNoneMatching;

import com.ddasoom.diary_service.common.annotation.UseCase;
import com.ddasoom.diary_service.diary.application.port.in.TrainingUseCase;
import com.ddasoom.diary_service.diary.application.port.out.TrainingRecordPort;
import com.ddasoom.diary_service.diary.error.TrainingTypeBadRequestException;
import java.time.LocalDate;
import lombok.RequiredArgsConstructor;
import org.springframework.transaction.annotation.Transactional;

@UseCase
@Transactional
@RequiredArgsConstructor
public class TrainingService implements TrainingUseCase {

    private final TrainingRecordPort trainingRecordPort;

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
    }
}
