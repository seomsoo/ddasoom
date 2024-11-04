package com.ddasoom.diary_service.diary.application.port.out;

import java.util.Optional;

public interface TrainingStatisticsPort {

    Optional<Integer> findContinueDayByUserId(Long userId);
}
