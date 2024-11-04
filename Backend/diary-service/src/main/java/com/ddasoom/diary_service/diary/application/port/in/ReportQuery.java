package com.ddasoom.diary_service.diary.application.port.in;

import com.ddasoom.diary_service.diary.adapter.in.web.response.ReportResponse;

public interface ReportQuery {

    ReportResponse getReport(Long userId, int year, int month);
}
