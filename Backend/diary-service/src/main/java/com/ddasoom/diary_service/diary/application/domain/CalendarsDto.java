package com.ddasoom.diary_service.diary.application.domain;

import com.querydsl.core.annotations.QueryProjection;
import java.time.LocalDate;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class CalendarsDto {

    private LocalDate date;
    private int trainingCount;
    private boolean panicStatus;

    @QueryProjection
    public CalendarsDto(LocalDate date, int trainingCount, boolean panicStatus) {
        this.date = date;
        this.trainingCount = trainingCount;
        this.panicStatus = panicStatus;
    }
}
