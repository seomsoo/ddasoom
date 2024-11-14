package com.ddasoom.diary_service.diary.adapter.out.selfDiagnosis;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
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
@Table(name = "self_diagnosis")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class SelfDiagnosisJpaEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "self_diagnosis_id")
    private Long id;

    private Long userId;

    @CreationTimestamp
    private LocalDateTime date;

    private Integer panicDoubtCount;

    @Builder
    private SelfDiagnosisJpaEntity(Long userId, Integer panicDoubtCount) {
        this.userId = userId;
        this.panicDoubtCount = panicDoubtCount;
    }
}
