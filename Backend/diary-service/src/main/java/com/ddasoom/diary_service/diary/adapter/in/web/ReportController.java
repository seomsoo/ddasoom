package com.ddasoom.diary_service.diary.adapter.in.web;

import static com.ddasoom.diary_service.common.util.ApiUtils.success;

import com.ddasoom.diary_service.common.annotation.WebAdapter;
import com.ddasoom.diary_service.common.util.ApiUtils.ApiResult;
import com.ddasoom.diary_service.diary.adapter.in.web.response.ReportResponse;
import com.ddasoom.diary_service.diary.application.port.in.ReportQuery;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

@WebAdapter
@RestController
@RequiredArgsConstructor
public class ReportController {

    private final ReportQuery reportQuery;

    @GetMapping("/api/diary/report/{year}/{month}")
    public ApiResult<ReportResponse> getDiaryReport(@RequestHeader("X-Authenticated-User") Long userId,
            @PathVariable("year") int year,
            @PathVariable("month") int month) {
        return success(reportQuery.getReport(userId, year, month));
    }
}
