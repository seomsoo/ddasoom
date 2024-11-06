package com.ddasoom.diary_service.diary.application.domain;

import java.time.LocalDate;

public record TrainingStatisticInfo(LocalDate lastTrainingDay,
                                    int trainingContinuousDay) {

}
