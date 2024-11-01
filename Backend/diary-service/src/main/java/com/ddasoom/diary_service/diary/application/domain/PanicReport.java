package com.ddasoom.diary_service.diary.application.domain;

import java.util.List;
import lombok.Builder;

@Builder
public record PanicReport(int panicCount,
                          int panicDurationAverage,
                          List<Integer> panicOccurDay) {

}
