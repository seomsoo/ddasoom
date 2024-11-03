package com.ddasoom.diary_service.diary.application.port.out;

import com.ddasoom.diary_service.diary.application.domain.PanicRecordInfo;
import com.ddasoom.diary_service.diary.application.port.in.PanicDescriptionCommand;
import java.util.List;

public interface PanicRecordPort {

    List<PanicRecordInfo> getPanicRecord(Long userId, int year, int month, int day);

    void savePanicRecord(PanicRecordInfo panic);

    void savePanicDescription(PanicDescriptionCommand command);
}
