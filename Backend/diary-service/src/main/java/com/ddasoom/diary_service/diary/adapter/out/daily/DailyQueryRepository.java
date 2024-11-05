package com.ddasoom.diary_service.diary.adapter.out.daily;

import com.ddasoom.diary_service.diary.application.domain.GetDailyReportDto;
import com.ddasoom.diary_service.diary.application.domain.QGetDailyReportDto;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class DailyQueryRepository {

    private final JPAQueryFactory jpaQueryFactory;

    public GetDailyReportDto getDailyReport(Long userId, int year, int month) {
        QDailyJpaEntity daily = QDailyJpaEntity.dailyJpaEntity;
        return jpaQueryFactory
                .select(new QGetDailyReportDto(
                        daily.caffeine.when(true).then(1).otherwise(0).sum(),
                        daily.smoking.when(true).then(1).otherwise(0).sum(),
                        daily.alcohol.when(true).then(1).otherwise(0).sum(),
                        daily.exercise.when(true).then(1).otherwise(0).sum(),
                        daily.count()
                ))
                .from(daily)
                .where(daily.userId.eq(userId)
                        .and(daily.date.year().eq(year))
                        .and(daily.date.month().eq(month))
                )
                .fetchOne();
    }
}
