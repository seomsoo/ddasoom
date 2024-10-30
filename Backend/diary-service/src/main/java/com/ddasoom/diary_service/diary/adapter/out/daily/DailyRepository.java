package com.ddasoom.diary_service.diary.adapter.out.daily;

import java.time.LocalDate;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DailyRepository extends JpaRepository<DailyJpaEntity, Long> {

    boolean existsByUserIdAndDate(Long userId, LocalDate date);
}
