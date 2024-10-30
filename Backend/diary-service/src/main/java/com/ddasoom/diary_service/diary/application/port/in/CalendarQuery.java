package com.ddasoom.diary_service.diary.application.port.in;

import com.ddasoom.diary_service.diary.adapter.in.web.response.CalendarsResponse;

public interface CalendarQuery {

    CalendarsResponse getCalendars(Long userId, String date);
}
