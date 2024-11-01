package com.ddasoom.diary_service.diary.adapter.out.daily;

import com.ddasoom.diary_service.diary.application.domain.GetDailyReport;
import com.ddasoom.diary_service.diary.application.domain.QGetDailyReport;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class DailyQueryRepository {

    private final JPAQueryFactory jpaQueryFactory;

    public GetDailyReport getDailyReport(Long userId, int year, int month) {
        QDailyJpaEntity daily = QDailyJpaEntity.dailyJpaEntity;
        return jpaQueryFactory
                .select(new QGetDailyReport(
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
                .groupBy(daily.userId)
                .fetchOne();
    }
}
