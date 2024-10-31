package com.ddasoom.diary_service.diary.application.port.out;

import java.time.LocalDate;
import java.util.List;

public interface TrainingRecordPort {

    void saveTrainingRecord(Long userId, String trainingType);

    boolean existTrainingRecordBy(Long userId, String trainingType, LocalDate date);

    List<String> getTrainingRecord(Long userId, int year, int month, int day);
}
