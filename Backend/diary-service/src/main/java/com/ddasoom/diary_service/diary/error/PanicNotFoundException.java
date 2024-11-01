package com.ddasoom.diary_service.diary.error;

public class PanicNotFoundException extends RuntimeException {

    public PanicNotFoundException() {
        super("공황발작 기록을 찾을 수 없습니다.");
    }

}
