package com.ddasoom.diary_service.diary.adapter.out.training;

import java.time.LocalDate;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface TrainingRepository extends JpaRepository<TrainingJpaEntity, Long> {

    boolean existsByUserIdAndTrainingTypeAndDate(Long userId, String trainingType, LocalDate date);

    @Query("SELECT t.trainingType FROM TrainingJpaEntity t "
            + "WHERE t.userId = :userId "
            + "AND FUNCTION('YEAR', t.date) = :year "
            + "AND FUNCTION('MONTH', t.date) = :month "
            + "AND FUNCTION('DAY', t.date) = :day")
    List<String> findAllByUserIdAndDay(@Param("userId") Long userId, @Param("year") int year,
            @Param("month") int month, @Param("day") int day);
}
