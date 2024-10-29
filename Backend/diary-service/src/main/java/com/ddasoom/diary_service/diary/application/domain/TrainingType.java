package com.ddasoom.diary_service.diary.application.domain;

import java.util.Arrays;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public enum TrainingType {

    BREATH("호흡 연습"),
    GROUNDING("그라운딩"),
    COMEDOWN("안정화기법");

    private final String description;

    public static boolean validateNoneMatching(String name) {
        return Arrays.stream(TrainingType.values())
                .noneMatch(type -> type.name().equals(name));
    }
}
