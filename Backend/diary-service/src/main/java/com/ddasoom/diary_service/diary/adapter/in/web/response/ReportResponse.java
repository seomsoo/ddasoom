package com.ddasoom.diary_service.diary.adapter.in.web.response;

import com.ddasoom.diary_service.diary.application.domain.PanicReport;
import lombok.Builder;

@Builder
public record ReportResponse(int totalRecordCount,
                             PanicReport panicReport) {

}
