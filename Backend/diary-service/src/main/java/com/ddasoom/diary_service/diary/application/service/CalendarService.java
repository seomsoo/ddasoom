package com.ddasoom.diary_service.diary.application.service;

import static java.time.LocalDate.now;

import com.ddasoom.diary_service.common.annotation.UseCase;
import com.ddasoom.diary_service.diary.adapter.in.web.response.CalendarResponse;
import com.ddasoom.diary_service.diary.adapter.in.web.response.CalendarsResponse;
import com.ddasoom.diary_service.diary.application.port.in.CalendarQuery;
import com.ddasoom.diary_service.diary.application.port.in.GetCalendarCommand;
import com.ddasoom.diary_service.diary.application.port.out.CalendarPort;
import com.ddasoom.diary_service.diary.application.port.out.DailyRecordPort;
import com.ddasoom.diary_service.diary.application.port.out.PanicRecordPort;
import com.ddasoom.diary_service.diary.application.port.out.TrainingRecordPort;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.transaction.annotation.Transactional;

@UseCase
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class CalendarService implements CalendarQuery {

    private final CalendarPort calendarPort;
    private final PanicRecordPort panicRecordPort;
    private final TrainingRecordPort trainingRecordPort;
    private final DailyRecordPort dailyRecordPort;

    @Override
    public CalendarsResponse getCalendars(Long userId, Optional<Integer> year, Optional<Integer> month) {

        return new CalendarsResponse(
                calendarPort.getCalendars(
                        userId,
                        year.orElse(now().getYear()),
                        month.orElse(now().getMonthValue()))
        );
    }

    @Override
    public CalendarResponse getCalendar(Long userId, GetCalendarCommand getCalendarCommand) {
        int year = getCalendarCommand.year();
        int month = getCalendarCommand.month();
        int day = getCalendarCommand.day();

        return new CalendarResponse(
                panicRecordPort.getPanicRecord(userId, year, month, day),
                trainingRecordPort.getTrainingRecord(userId, year, month, day),
                dailyRecordPort.getDailyRecord(userId, year, month, day)
        );
    }
}
