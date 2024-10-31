package com.ddasoom.diary_service.diary.adapter.in.web;

import static com.ddasoom.diary_service.common.util.ApiUtils.success;

import com.ddasoom.diary_service.common.annotation.WebAdapter;
import com.ddasoom.diary_service.common.util.ApiUtils.ApiResult;
import com.ddasoom.diary_service.diary.adapter.in.web.response.CalendarResponse;
import com.ddasoom.diary_service.diary.adapter.in.web.response.CalendarsResponse;
import com.ddasoom.diary_service.diary.application.port.in.CalendarQuery;
import com.ddasoom.diary_service.diary.application.port.in.GetCalendarCommand;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@WebAdapter
@RestController
@RequiredArgsConstructor
public class CalendarController {

    private final CalendarQuery calendarQuery;

    @GetMapping("/api/diary/calendars")
    public ApiResult<CalendarsResponse> getCalendars(@RequestHeader("X-Authenticated-User") Long userId,
            @RequestParam(name = "year", required = false) Optional<Integer> year,
            @RequestParam(value = "month", required = false) Optional<Integer> month) {
        return success(calendarQuery.getCalendars(userId, year, month));
    }

    @GetMapping("/api/diary/calendar")
    public ApiResult<CalendarResponse> getCalendar(@RequestHeader("X-Authenticated-User") Long userId,
            @ModelAttribute GetCalendarCommand getCalendarCommand) {
        return success(calendarQuery.getCalendar(userId, getCalendarCommand));
    }
}
