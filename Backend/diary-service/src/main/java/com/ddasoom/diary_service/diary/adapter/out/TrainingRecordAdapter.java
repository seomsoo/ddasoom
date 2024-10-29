package com.ddasoom.diary_service.diary.adapter.out;

import com.ddasoom.diary_service.common.annotation.PersistenceAdapter;
import com.ddasoom.diary_service.diary.application.port.out.TrainingRecordPort;
import lombok.RequiredArgsConstructor;

@PersistenceAdapter
@RequiredArgsConstructor
public class TrainingRecordAdapter implements TrainingRecordPort {

    private final TrainingRepository trainingRepository;

    @Override
    public void saveTrainingRecord(Long userId, String trainingType) {
        trainingRepository.save(
                TrainingJpaEntity.builder()
                        .userId(userId)
                        .trainingType(trainingType)
                        .build()
        );
    }
}
