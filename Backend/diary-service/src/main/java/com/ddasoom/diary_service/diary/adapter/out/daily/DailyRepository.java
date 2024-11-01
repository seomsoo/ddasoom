package com.ddasoom.diary_service.diary.adapter.out.daily;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface DailyRepository extends JpaRepository<DailyJpaEntity, Long> {

    boolean existsByUserIdAndDate(Long userId, LocalDate date);

    @Query("SELECT d FROM DailyJpaEntity d WHERE d.userId = :userId "
            + "AND FUNCTION('YEAR', d.date) = :year "
            + "AND FUNCTION('MONTH', d.date) = :month "
            + "AND FUNCTION('DAY', d.date) = :day")
    Optional<DailyJpaEntity> findByUserIdAndDate(@Param("userId") Long userId, @Param("year") int year,
            @Param("month") int month, @Param("day") int day);

    @Query("SELECT d FROM DailyJpaEntity d WHERE d.userId = :userId "
            + "AND FUNCTION('YEAR', d.date) = :year "
            + "AND FUNCTION('MONTH', d.date) = :month")
    List<DailyJpaEntity> findAllByUserIdAndDate(@Param("userId") Long userId, @Param("year") int year,
            @Param("month") int month);
}
