package com.ddasoom.diary_service.diary.adapter.out.panic;

import com.ddasoom.diary_service.common.annotation.PersistenceAdapter;
import com.ddasoom.diary_service.diary.application.domain.PanicRecordInfo;
import com.ddasoom.diary_service.diary.application.port.out.PanicRecordPort;
import lombok.RequiredArgsConstructor;

@PersistenceAdapter
@RequiredArgsConstructor
public class PanicRecordAdapter implements PanicRecordPort {

    private final PanicRepository panicRepository;

    @Override
    public PanicRecordInfo getPanicRecord(Long userId, int year, int month, int day) {
        panicRepository.findByUserIdAndDate(userId, year, month, day);
        return null;
    }
}
