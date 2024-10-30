package com.ddasoom.diary_service.diary.adapter.out.training;

import com.ddasoom.diary_service.common.annotation.PersistenceAdapter;
import com.ddasoom.diary_service.diary.application.domain.TrainingRecordInfo;
import com.ddasoom.diary_service.diary.application.port.out.TrainingRecordPort;
import java.time.LocalDate;
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

    @Override
    public boolean existTrainingRecordBy(Long userId, String trainingType, LocalDate date) {
        return trainingRepository.existsByUserIdAndTrainingTypeAndDate(userId, trainingType, date);
    }

    @Override
    public TrainingRecordInfo getTrainingRecord(Long userId, int year, int month, int day) {
        return null;
    }
}
