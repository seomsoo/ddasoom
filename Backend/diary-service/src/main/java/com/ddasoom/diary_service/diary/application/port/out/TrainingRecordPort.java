package com.ddasoom.diary_service.diary.application.port.out;

public interface TrainingRecordPort {

    void saveTrainingRecord(Long userId, String trainingType);
}
