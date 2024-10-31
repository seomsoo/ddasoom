package com.ddasoom.diary_service.diary.application.port.out;

import com.ddasoom.diary_service.diary.application.domain.PanicRecordInfo;

public interface PanicRecordPort {

    PanicRecordInfo getPanicRecord(Long userId, int year, int month, int day);
    void savePanicRecord(PanicRecordInfo panic);
}
