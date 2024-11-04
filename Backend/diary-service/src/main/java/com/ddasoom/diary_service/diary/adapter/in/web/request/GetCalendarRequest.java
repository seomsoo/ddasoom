package com.ddasoom.diary_service.diary.adapter.in.web.request;

import com.ddasoom.diary_service.diary.application.port.in.GetCalendarCommand;

public record GetCalendarRequest(int year, int month, int day) {

    public GetCalendarCommand toCommand() {
        return new GetCalendarCommand(year, month, day);
    }
}
