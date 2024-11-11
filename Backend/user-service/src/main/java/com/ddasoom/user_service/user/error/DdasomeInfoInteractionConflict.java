package com.ddasoom.user_service.user.error;

public class DdasomeInfoInteractionConflict extends RuntimeException {

    public DdasomeInfoInteractionConflict() {
        super("해당 상호작용을 수행가능한 횟수가 부족합니다.");
    }
}
