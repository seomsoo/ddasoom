package com.ddasoom.diary_service.diary.error;

public class TrainingTypeBadRequestException extends RuntimeException {

    public TrainingTypeBadRequestException() {
        super("잘못된 훈련 타입입니다.");
    }
}
