package com.ddasoom.diary_service.diary.adapter.out.daily;

import com.ddasoom.diary_service.common.annotation.PersistenceAdapter;
import com.ddasoom.diary_service.diary.application.domain.DailyRecordInfo;
import com.ddasoom.diary_service.diary.application.domain.GetDailyReportDto;
import com.ddasoom.diary_service.diary.application.port.in.DailyRecordCommand;
import com.ddasoom.diary_service.diary.application.port.out.DailyRecordPort;
import java.time.LocalDate;
import lombok.RequiredArgsConstructor;

@PersistenceAdapter
@RequiredArgsConstructor
public class DailyRecordAdapter implements DailyRecordPort {

    private final DailyRepository dailyRepository;
    private final DailyQueryRepository queryRepository;

    @Override
    public void saveDailyRecord(Long userId, DailyRecordCommand command) {
        dailyRepository.save(
                DailyJpaEntity.of(userId, command)
        );
    }

    @Override
    public boolean existsDailyRecordBy(Long userId, LocalDate date) {
        return dailyRepository.existsByUserIdAndDate(userId, date);
    }

    @Override
    public DailyRecordInfo getDailyRecord(Long userId, int year, int month, int day) {
        return dailyRepository.findByUserIdAndDate(userId, year, month, day)
                .map(DailyJpaEntity::toDailyRecordInfo)
                .orElse(null);
    }

    @Override
    public GetDailyReportDto getDailyReport(Long userId, int year, int month) {
        return queryRepository.getDailyReport(userId, year, month);
    }
}
