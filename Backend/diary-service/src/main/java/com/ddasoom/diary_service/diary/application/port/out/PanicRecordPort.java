package com.ddasoom.diary_service.diary.application.port.out;

import com.ddasoom.diary_service.diary.application.domain.PanicRecordInfo;
import com.ddasoom.diary_service.diary.application.domain.PanicReportInfo;
import java.util.List;

public interface PanicRecordPort {

    PanicRecordInfo getPanicRecord(Long userId, int year, int month, int day);

    List<PanicReportInfo> getPanicReport(Long userId, int year, int month);
}
