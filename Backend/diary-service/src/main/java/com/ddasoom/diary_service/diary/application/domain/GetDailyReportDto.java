package com.ddasoom.diary_service.diary.application.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.querydsl.core.annotations.QueryProjection;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class GetDailyReportDto {

    private int caffeine;
    private int smoking;
    private int alcohol;
    private int exercise;

    @JsonIgnore
    private Long totalRecordCount;

    @QueryProjection
    public GetDailyReportDto(int caffeine, int smoking, int alcohol, int exercise, Long totalRecordCount) {
        this.caffeine = caffeine;
        this.smoking = smoking;
        this.alcohol = alcohol;
        this.exercise = exercise;
        this.totalRecordCount = totalRecordCount;
    }
}
