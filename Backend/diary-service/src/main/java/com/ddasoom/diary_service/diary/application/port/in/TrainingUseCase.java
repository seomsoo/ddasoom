package com.ddasoom.diary_service.diary.application.port.in;

public interface TrainingUseCase {

    void saveTrainingRecord(Long userId, String trainingType);
}
