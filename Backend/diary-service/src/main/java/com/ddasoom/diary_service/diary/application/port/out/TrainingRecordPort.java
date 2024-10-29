package com.ddasoom.diary_service.diary.application.port.out;

import java.time.LocalDate;

public interface TrainingRecordPort {

    void saveTrainingRecord(Long userId, String trainingType);

    boolean existTrainingRecordBy(Long userId, String trainingType, LocalDate date);
}
