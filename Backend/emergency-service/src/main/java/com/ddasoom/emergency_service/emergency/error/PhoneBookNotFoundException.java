package com.ddasoom.emergency_service.emergency.error;

public class PhoneBookNotFoundException extends RuntimeException {

    public PhoneBookNotFoundException() {
        super("긴급 연락처를 찾을 수 없습니다.");
    }
}
