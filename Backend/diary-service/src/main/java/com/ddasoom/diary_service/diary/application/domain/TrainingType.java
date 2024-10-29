package com.ddasoom.diary_service.diary.application.domain;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public enum TrainingType {

    BREATH("호흡 연습"),
    GROUNDING("그라운딩"),
    COMEDOWN("안정화기법");

    private final String description;
}
