package com.ddasoom.diary_service.diary.adapter.out.panic;

import com.querydsl.core.annotations.QueryProjection;
import java.time.LocalDateTime;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class PanicCalendarInfo {

    private LocalDateTime date;
    private int trainingCount;
    private boolean panicStatus;

    @QueryProjection
    public PanicCalendarInfo(LocalDateTime date, int trainingCount, boolean panicStatus) {
        this.date = date;
        this.trainingCount = trainingCount;
        this.panicStatus = panicStatus;
    }
}