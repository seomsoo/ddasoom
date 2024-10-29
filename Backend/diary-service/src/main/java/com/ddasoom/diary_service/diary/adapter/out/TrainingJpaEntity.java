package com.ddasoom.diary_service.diary.adapter.out;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import java.time.LocalDateTime;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

@Entity
@Table(name = "training_record")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class TrainingJpaEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "training_record_id")
    private Long id;

    private Long userId;

    @CreationTimestamp
    private LocalDateTime date;

    @Enumerated(value = EnumType.STRING)
    private TrainingType trainingType;

    @Builder
    private TrainingJpaEntity(Long userId, TrainingType trainingType) {
        this.userId = userId;
        this.trainingType = trainingType;
    }
}
