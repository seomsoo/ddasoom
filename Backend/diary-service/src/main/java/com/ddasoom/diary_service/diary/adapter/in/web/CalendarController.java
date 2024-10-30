package com.ddasoom.diary_service.diary.adapter.in.web;

import static com.ddasoom.diary_service.common.util.ApiUtils.success;

import com.ddasoom.diary_service.common.annotation.WebAdapter;
import com.ddasoom.diary_service.common.util.ApiUtils.ApiResult;
import com.ddasoom.diary_service.diary.adapter.in.web.response.CalendarsResponse;
import com.ddasoom.diary_service.diary.application.port.in.CalendarQuery;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

@WebAdapter
@RestController
@RequiredArgsConstructor
public class CalendarController {

    private final CalendarQuery calendarQuery;

    @GetMapping("/api/diary/calendars/{date}")
    public ApiResult<CalendarsResponse> getCalendars(@RequestHeader("X-Authenticated-User") Long userId,
            @PathVariable("date") String date) {
        return success(calendarQuery.getCalendars(userId, date));
    }
}
