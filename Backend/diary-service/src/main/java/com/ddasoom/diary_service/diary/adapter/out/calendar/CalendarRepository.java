package com.ddasoom.diary_service.diary.adapter.out.calendar;

import static com.ddasoom.diary_service.diary.adapter.out.daily.QDailyJpaEntity.dailyJpaEntity;
import static com.ddasoom.diary_service.diary.adapter.out.panic.QPanicJpaEntity.panicJpaEntity;
import static com.ddasoom.diary_service.diary.adapter.out.training.QTrainingJpaEntity.trainingJpaEntity;

import com.ddasoom.diary_service.diary.adapter.out.panic.QPanicCalendarInfo;
import com.ddasoom.diary_service.diary.application.domain.CalendarsDto;
import com.ddasoom.diary_service.diary.application.domain.QCalendarsDto;
import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.jpa.impl.JPAQueryFactory;
import java.time.LocalDate;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class CalendarRepository {

    private final JPAQueryFactory jpaQueryFactory;

    public List<CalendarsDto> getTrainings(Long userId, LocalDate startDate, LocalDate endDate) {
        return jpaQueryFactory
                .select(new QCalendarsDto(
                        trainingJpaEntity.date,
                        trainingJpaEntity.count().intValue(),
                        Expressions.asBoolean(false), // 훈련 기록에서는 공황 여부를 false로 설정
                        Expressions.asBoolean(false)
                ))
                .from(trainingJpaEntity)
                .where(trainingJpaEntity.userId.eq(userId)
                        .and(trainingJpaEntity.date.between(startDate, endDate)))
                .groupBy(trainingJpaEntity.date)
                .fetch();
    }

    public List<CalendarsDto> getPanics(Long userId, int year, int month) {
        return jpaQueryFactory
                .select(new QPanicCalendarInfo(
                        panicJpaEntity.startDate,
                        Expressions.constant(0), // 공황 기록에서는 훈련 횟수를 0으로 설정
                        Expressions.asBoolean(true), // 공황 기록에서는 공황 여부를 true로 설정
                        Expressions.asBoolean(false)
                ))
                .from(panicJpaEntity)
                .where(panicJpaEntity.userId.eq(userId)
                        .and(panicJpaEntity.startDate.year().eq(year))
                        .and(panicJpaEntity.startDate.month().eq(month)))
                .groupBy(Expressions.dateTemplate(LocalDate.class, "{0}", panicJpaEntity.startDate))
                .fetch()
                .stream()
                .map(dto -> new CalendarsDto(
                        dto.getDate().toLocalDate(),
                        dto.getTrainingCount(),
                        dto.isPanicStatus(),
                        dto.isDailyStatus()
                )).toList();
    }

    public List<CalendarsDto> getDailies(Long userId, LocalDate startDate, LocalDate endDate) {
        return jpaQueryFactory
                .select(new QCalendarsDto(
                        dailyJpaEntity.date,
                        Expressions.constant(0),
                        Expressions.asBoolean(false),
                        Expressions.asBoolean(true)
                ))
                .from(dailyJpaEntity)
                .where(dailyJpaEntity.userId.eq(userId)
                        .and(dailyJpaEntity.date.between(startDate, endDate)))
                .groupBy(dailyJpaEntity.date)
                .fetch();
    }
}
