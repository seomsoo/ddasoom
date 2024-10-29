package com.ddasoom.user_service.user.error;

public class DuplicatedUserException extends RuntimeException {

    public DuplicatedUserException() {
        super("중복된 유저입니다.");
    }
}
