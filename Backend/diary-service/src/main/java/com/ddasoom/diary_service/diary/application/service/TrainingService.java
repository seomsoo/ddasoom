package com.ddasoom.diary_service.diary.application.service;

import com.ddasoom.diary_service.common.annotation.UseCase;
import com.ddasoom.diary_service.diary.application.domain.TrainingType;
import com.ddasoom.diary_service.diary.application.port.in.TrainingUseCase;
import com.ddasoom.diary_service.diary.application.port.out.TrainingRecordPort;
import com.ddasoom.diary_service.diary.error.TrainingTypeBadRequestException;
import java.util.Arrays;
import lombok.RequiredArgsConstructor;
import org.springframework.transaction.annotation.Transactional;

@UseCase
@Transactional
@RequiredArgsConstructor
public class TrainingService implements TrainingUseCase {

    private final TrainingRecordPort trainingRecordPort;

    @Override
    public void saveTrainingRecord(Long userId, String trainingType) {
        if (Arrays.stream(TrainingType.values())
                .noneMatch(type -> type.name().equals(trainingType))) {
            throw new TrainingTypeBadRequestException();
        }

        trainingRecordPort.saveTrainingRecord(userId, trainingType);
    }
}
