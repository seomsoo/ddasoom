package com.ddasoom.diary_service.diary.adapter.out.training.statistics;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class TrainingStatisticsJpaEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "training_statistics_id")
    private Long id;

    private Long userId;

    private Integer trainingContinuousDay;

    @Builder
    private TrainingStatisticsJpaEntity(Long userId, Integer trainingContinuousDay) {
        this.userId = userId;
        this.trainingContinuousDay = trainingContinuousDay;
    }

    //    private LocalDate lastTrainingDay;


    public void initTrainingContinuousDay() {
        this.trainingContinuousDay = 0;
    }

    public void addTrainingContinuousDay() {
        this.trainingContinuousDay++;
    }

    public void setTrainingContinuousDay(int trainingContinuousDay) {
        this.trainingContinuousDay = trainingContinuousDay;
    }

//    public void updateLastTrainingDay(LocalDate lastTrainingDay) {
//        this.lastTrainingDay = lastTrainingDay;
//    }
}
