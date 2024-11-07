package com.ddasoom.user_service.user.error;

public class DdasomiInfoNotFoundException extends RuntimeException {

    public DdasomiInfoNotFoundException() {
        super("따소미를 찾을 수 없습니다.");
    }
}
