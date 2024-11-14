package com.ddasoom.diary_service.diary.application.domain;

import com.querydsl.core.annotations.QueryProjection;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class GetSelfDiagnosisDto {

    private int progressCount;

    private int totalPanicDoubtCount;

    @QueryProjection
    public GetSelfDiagnosisDto(int progressCount, int totalPanicDoubtCount) {
        this.progressCount = progressCount;
        this.totalPanicDoubtCount = totalPanicDoubtCount;
    }
}
