package com.ddasoom.diary_service.diary.adapter.out.training.statistics;

import com.ddasoom.diary_service.common.annotation.PersistenceAdapter;
import com.ddasoom.diary_service.diary.application.port.out.TrainingStatisticsPort;
import java.util.Optional;
import lombok.RequiredArgsConstructor;

@PersistenceAdapter
@RequiredArgsConstructor
public class TrainingStatisticsQueryAdapter implements TrainingStatisticsPort {

    private final TrainingStatisticsRepository statisticsRepository;

    @Override
    public Optional<Integer> findContinueDayByUserId(Long userId) {
        return statisticsRepository.findTrainingContinuousDayByUserId(userId);
    }
}
