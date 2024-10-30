package com.ddasoom.diary_service.diary.adapter.out;

import static com.ddasoom.diary_service.diary.adapter.out.QPanicJpaEntity.panicJpaEntity;
import static com.ddasoom.diary_service.diary.adapter.out.QTrainingJpaEntity.trainingJpaEntity;

import com.ddasoom.diary_service.common.annotation.PersistenceAdapter;
import com.ddasoom.diary_service.diary.application.domain.CalendarsDto;
import com.ddasoom.diary_service.diary.application.domain.QCalendarsDto;
import com.ddasoom.diary_service.diary.application.port.out.CalendarPort;
import com.querydsl.core.types.dsl.DateTimePath;
import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.jpa.impl.JPAQueryFactory;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;

@PersistenceAdapter
@RequiredArgsConstructor
public class CalendarQueryAdapter implements CalendarPort {

    private final JPAQueryFactory jpaQueryFactory;

    @Override
    public List<CalendarsDto> getCalendars(Long userId, int year, int month) {
        LocalDate startDate = LocalDate.of(year, month, 1);
        LocalDate endDate = startDate.withDayOfMonth(startDate.lengthOfMonth());

        List<CalendarsDto> trainings = getTrainings(userId, trainingJpaEntity, startDate, endDate);
        List<CalendarsDto> panics = getPanics(userId, year, month, panicJpaEntity);

        Map<LocalDate, CalendarsDto> resultMap = getDateCalendarsMap(trainings, panics);

        // 결과를 날짜순으로 정렬하여 반환
        return resultMap.values().stream()
                .sorted(Comparator.comparing(CalendarsDto::getDate))
                .collect(Collectors.toList());
    }

    private List<CalendarsDto> getTrainings(Long userId, QTrainingJpaEntity training, LocalDate startDate,
            LocalDate endDate) {
        return jpaQueryFactory
                .select(new QCalendarsDto(
                        training.date,
                        training.count().intValue(),
                        Expressions.asBoolean(false) // 훈련 기록에서는 공황 여부를 false로 설정
                ))
                .from(training)
                .where(training.userId.eq(userId)
                        .and(training.date.between(startDate, endDate)))
                .groupBy(training.date)
                .fetch();
    }

    private List<CalendarsDto> getPanics(Long userId, int year, int month, QPanicJpaEntity panic) {
        DateTimePath<LocalDateTime> startDate = panic.startDate;

        return jpaQueryFactory
                .select(new QCalendarsDto(
                        Expressions.dateTemplate(LocalDate.class, "{0}", startDate),
                        Expressions.constant(0), // 공황 기록에서는 훈련 횟수를 0으로 설정
                        Expressions.asBoolean(true) // 공황 기록에서는 공황 여부를 true로 설정
                ))
                .from(panic)
                .where(panic.userId.eq(userId)
                        .and(panic.startDate.year().eq(year))
                        .and(panic.startDate.month().eq(month)))
                .groupBy(Expressions.dateTemplate(LocalDate.class, "{0}", panic.startDate))
                .fetch();
    }

    // 두 결과를 날짜별로 합치기 위해 Map으로 변환
    private static Map<LocalDate, CalendarsDto> getDateCalendarsMap(List<CalendarsDto> trainingData,
            List<CalendarsDto> panicData) {
        Map<LocalDate, CalendarsDto> resultMap = trainingData.stream()
                .collect(Collectors.toMap(CalendarsDto::getDate, record -> record));

        for (CalendarsDto panicRecord : panicData) {
            resultMap.merge(panicRecord.getDate(), panicRecord, (existing, newData) -> {
                existing.setPanicStatus(true); // 공황 여부를 true로 설정
                return existing;
            });
        }
        return resultMap;
    }
}
