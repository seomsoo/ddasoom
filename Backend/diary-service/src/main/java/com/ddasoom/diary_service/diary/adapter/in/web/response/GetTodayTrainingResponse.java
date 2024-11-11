package com.ddasoom.diary_service.diary.adapter.in.web.response;

import static com.ddasoom.diary_service.diary.application.domain.TrainingType.BREATH;
import static com.ddasoom.diary_service.diary.application.domain.TrainingType.COMEDOWN;
import static com.ddasoom.diary_service.diary.application.domain.TrainingType.GROUNDING;
import static com.ddasoom.diary_service.diary.application.domain.TrainingType.values;

import com.ddasoom.diary_service.diary.application.domain.TrainingType;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

public record GetTodayTrainingResponse(boolean breath,
                                       boolean grounding,
                                       boolean comedown) {

    public static GetTodayTrainingResponse from(List<String> trainingNames) {
        Map<TrainingType, Boolean> trainingMap = Arrays.stream(values())
                .collect(Collectors.toMap(
                        type -> type,
                        type -> trainingNames.contains(type.name())
                ));

        return new GetTodayTrainingResponse(
                trainingMap.getOrDefault(BREATH, false),
                trainingMap.getOrDefault(GROUNDING, false),
                trainingMap.getOrDefault(COMEDOWN, false)
        );
    }
}
