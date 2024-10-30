package com.ddasoom.diary_service.diary.adapter.out.panic;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface PanicRepository extends JpaRepository<PanicJpaEntity, Long> {

    @Query("SELECT p FROM PanicJpaEntity p "
            + "WHERE p.userId = :userId AND "
            + "FUNCTION('YEAR', p.startDate) = :year AND "
            + "FUNCTION('MONTH', p.startDate) = :month AND "
            + "FUNCTION('DAY', p.startDate) = :day")
    Optional<PanicJpaEntity> findByUserIdAndDate(@Param("userId") Long userId, @Param("year") int year,
            @Param("month") int month, @Param("day") int day);
}
