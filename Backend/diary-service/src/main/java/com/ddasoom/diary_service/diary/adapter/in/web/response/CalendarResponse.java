package com.ddasoom.diary_service.diary.adapter.in.web.response;

import com.ddasoom.diary_service.diary.application.domain.DailyRecordInfo;
import com.ddasoom.diary_service.diary.application.domain.PanicRecordInfo;
import java.util.List;

public record CalendarResponse(PanicRecordInfo panicRecord,
                               List<String> trainingRecord,
                               DailyRecordInfo dailyRecord) {

}
