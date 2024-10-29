package com.ddasoom.diary_service.diary.adapter.out;

import com.ddasoom.diary_service.common.annotation.PersistenceAdapter;
import com.ddasoom.diary_service.diary.application.port.in.DailyRecordCommand;
import com.ddasoom.diary_service.diary.application.port.out.DailyRecordPort;
import java.time.LocalDate;
import lombok.RequiredArgsConstructor;

@PersistenceAdapter
@RequiredArgsConstructor
public class DailyRecordAdapter implements DailyRecordPort {

    private final DailyRepository dailyRepository;

    @Override
    public void saveDailyRecord(Long userId, DailyRecordCommand command) {
        dailyRepository.save(
                DailyJpaEntity.builder()
                        .userId(userId)
                        .alcohol(command.alcohol())
                        .caffeine(command.caffeine())
                        .smoking(command.smoking())
                        .exercise(command.exercise())
                        .description(command.description())
                        .date(command.date())
                        .build()
        );
    }

    @Override
    public boolean existsDailyRecordBy(Long userId, LocalDate date) {
        return dailyRepository.existsByUserIdAndDate(userId, date);
    }
}
