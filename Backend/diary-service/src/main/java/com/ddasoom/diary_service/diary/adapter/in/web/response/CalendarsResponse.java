package com.ddasoom.diary_service.diary.adapter.in.web.response;

import com.ddasoom.diary_service.diary.application.domain.CalendarsDto;
import java.util.List;

public record CalendarsResponse(List<CalendarsDto> calendars) {

}
