package com.ddasoom.diary_service.diary.adapter.out.calendar;

import com.ddasoom.diary_service.common.annotation.PersistenceAdapter;
import com.ddasoom.diary_service.diary.application.domain.CalendarsDto;
import com.ddasoom.diary_service.diary.application.port.out.CalendarPort;
import java.time.LocalDate;
import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;

@PersistenceAdapter
@RequiredArgsConstructor
public class CalendarQueryAdapter implements CalendarPort {

    private final CalendarRepository calendarRepository;

    @Override
    public List<CalendarsDto> getCalendars(Long userId, int year, int month) {
        LocalDate startDate = LocalDate.of(year, month, 1);
        LocalDate endDate = startDate.withDayOfMonth(startDate.lengthOfMonth());

        List<CalendarsDto> trainings = calendarRepository.getTrainings(userId, startDate, endDate);
        List<CalendarsDto> panics = calendarRepository.getPanics(userId, year, month);
        List<CalendarsDto> dailies = calendarRepository.getDailies(userId, startDate, endDate);

        Map<LocalDate, CalendarsDto> resultMap = getDateCalendarsMap(trainings, panics, dailies);

        // 결과를 날짜순으로 정렬하여 반환
        return resultMap.values().stream()
                .sorted(Comparator.comparing(CalendarsDto::getDate))
                .collect(Collectors.toList());
    }

    // 두 결과를 날짜별로 합치기 위해 Map으로 변환
    private static Map<LocalDate, CalendarsDto> getDateCalendarsMap(List<CalendarsDto> trainingData,
            List<CalendarsDto> panicData, List<CalendarsDto> dailies) {
        Map<LocalDate, CalendarsDto> resultMap = trainingData.stream()
                .collect(Collectors.toMap(CalendarsDto::getDate, record -> record));

        mergePanicStatus(panicData, resultMap);
        mergeDailyStatus(dailies, resultMap);
        return resultMap;
    }

    private static void mergePanicStatus(List<CalendarsDto> panicData, Map<LocalDate, CalendarsDto> resultMap) {
        for (CalendarsDto panicRecord : panicData) {
            resultMap.merge(
                    panicRecord.getDate(),
                    panicRecord,
                    (existing, newData) -> {
                        existing.setPanicStatus(true); // 공황 여부를 true로 설정
                        return existing;
                    });
        }
    }

    private static void mergeDailyStatus(List<CalendarsDto> dailies, Map<LocalDate, CalendarsDto> resultMap) {
        for (CalendarsDto dailyRecord : dailies) {
            resultMap.merge(
                    dailyRecord.getDate(),
                    dailyRecord,
                    (existing, newData) -> {
                        existing.setDailyStatus(true); // 기록 여부를 true로 설정
                        return existing;
                    });
        }
    }
}
