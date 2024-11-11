package com.ddasoom.user_service.user.error;

public class DdasomeInfoInteractionBadRequest extends RuntimeException {

    public DdasomeInfoInteractionBadRequest() {
        super("잘못된 요청입니다. 요청값을 확인 해주세요.");
    }
}
