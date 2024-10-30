package com.ddasoom.diary_service.diary.application.port.out;

import com.ddasoom.diary_service.diary.application.domain.CalendarsDto;
import java.util.List;

public interface CalendarPort {

    List<CalendarsDto> getCalendars(Long userId, int year, int month);
}
