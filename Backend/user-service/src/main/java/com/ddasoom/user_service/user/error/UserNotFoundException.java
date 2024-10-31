package com.ddasoom.user_service.user.error;

public class UserNotFoundException extends RuntimeException {

    public UserNotFoundException() {
        super("유저를 찾을 수 없습니다.");
    }
}
