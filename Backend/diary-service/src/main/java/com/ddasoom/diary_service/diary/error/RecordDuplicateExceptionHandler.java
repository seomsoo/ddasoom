package com.ddasoom.diary_service.diary.error;

public class RecordDuplicateExceptionHandler extends RuntimeException {

    public RecordDuplicateExceptionHandler() {
        super("이미 저장된 기록이 있습니다.");
    }
}
