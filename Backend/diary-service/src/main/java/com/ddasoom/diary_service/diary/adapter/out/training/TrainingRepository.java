package com.ddasoom.diary_service.diary.adapter.out.training;

import java.time.LocalDate;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface TrainingRepository extends JpaRepository<TrainingJpaEntity, Long> {

    boolean existsByUserIdAndTrainingTypeAndDate(Long userId, String trainingType, LocalDate date);

    boolean existsByUserIdAndDate(Long userId, LocalDate date);

    @Query("SELECT t.trainingType FROM TrainingJpaEntity t "
            + "WHERE t.userId = :userId "
            + "AND FUNCTION('YEAR', t.date) = :year "
            + "AND FUNCTION('MONTH', t.date) = :month "
            + "AND FUNCTION('DAY', t.date) = :day")
    List<String> findAllByUserIdAndDay(@Param("userId") Long userId, @Param("year") int year,
            @Param("month") int month, @Param("day") int day);

    @Query("SELECT FUNCTION('DAY', t.date) FROM TrainingJpaEntity t "
            + "WHERE t.userId = :userId "
            + "AND FUNCTION('YEAR', t.date) = :year "
            + "AND FUNCTION('MONTH', t.date) = :month "
            + "GROUP BY(t.date)")
    List<Integer> findAllContinuousDay(@Param("userId") Long userId, @Param("year") int year,
            @Param("month") int month);

    @Query("SELECT t.date FROM TrainingJpaEntity t "
            + "WHERE t.userId = :userId "
            + "AND t.date != :date "
            + "GROUP BY t.date "
            + "ORDER BY t.date DESC")
    List<LocalDate> findTrainingDateBy(@Param("userId") Long userId, @Param("date") LocalDate date);

    @Query("SELECT t.date FROM TrainingJpaEntity t "
            + "WHERE t.userId = :userId "
            + "AND t.date != :date "
            + "ORDER BY t.date DESC "
            + "LIMIT 1")
    LocalDate findLastTrainingDateBy(@Param("userId") Long userId, @Param("date") LocalDate date);
}
