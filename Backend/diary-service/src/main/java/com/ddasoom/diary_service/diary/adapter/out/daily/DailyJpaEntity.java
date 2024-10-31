package com.ddasoom.diary_service.diary.adapter.out.daily;

import com.ddasoom.diary_service.diary.application.domain.DailyRecordInfo;
import com.ddasoom.diary_service.diary.application.port.in.DailyRecordCommand;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import java.time.LocalDate;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "daily_record")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class DailyJpaEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "daily_record_id")
    private Long id;

    private Long userId;

    private LocalDate date;

    private boolean alcohol;

    private boolean caffeine;

    private boolean smoking;

    private boolean exercise;

    @Column(length = 500)
    private String description;

    @Builder
    private DailyJpaEntity(Long userId, LocalDate date, boolean alcohol, boolean caffeine, boolean smoking,
            boolean exercise, String description) {
        this.userId = userId;
        this.date = date;
        this.alcohol = alcohol;
        this.caffeine = caffeine;
        this.smoking = smoking;
        this.exercise = exercise;
        this.description = description;
    }

    public static DailyJpaEntity of(Long userId, DailyRecordCommand command) {
        return DailyJpaEntity.builder()
                .userId(userId)
                .alcohol(command.alcohol())
                .caffeine(command.caffeine())
                .smoking(command.smoking())
                .exercise(command.exercise())
                .description(command.description())
                .date(command.date())
                .build();
    }

    public DailyRecordInfo toDailyRecordInfo() {
        return DailyRecordInfo.builder()
                .alcohol(this.alcohol)
                .caffeine(this.caffeine)
                .smoking(this.smoking)
                .exercise(this.exercise)
                .description(this.description)
                .build();
    }
}
