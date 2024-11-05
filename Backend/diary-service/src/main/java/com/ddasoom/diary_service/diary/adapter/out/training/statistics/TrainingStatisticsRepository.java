package com.ddasoom.diary_service.diary.adapter.out.training.statistics;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface TrainingStatisticsRepository extends JpaRepository<TrainingStatisticsJpaEntity, Long> {

    @Query("SELECT s.trainingContinuousDay FROM TrainingStatisticsJpaEntity s "
            + "WHERE s.userId = :userId")
    Optional<Integer> findTrainingContinuousDayByUserId(@Param("userId") Long userId);

    Optional<TrainingStatisticsJpaEntity> findByUserId(Long userId);
}
