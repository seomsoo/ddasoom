package com.ddasoom.diary_service.diary.application.port.in;

import com.ddasoom.diary_service.diary.adapter.in.web.response.CalendarsResponse;
import java.util.Optional;

public interface CalendarQuery {

    CalendarsResponse getCalendars(Long userId, Optional<Integer> year, Optional<Integer> month);
}
