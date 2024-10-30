package com.ddasoom.diary_service.diary.adapter.out.training;

import java.time.LocalDate;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TrainingRepository extends JpaRepository<TrainingJpaEntity, Long> {

    boolean existsByUserIdAndTrainingTypeAndDate(Long userId, String trainingType, LocalDate date);
}
