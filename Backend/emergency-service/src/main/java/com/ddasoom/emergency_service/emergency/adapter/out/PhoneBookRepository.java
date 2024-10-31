package com.ddasoom.emergency_service.emergency.adapter.out;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PhoneBookRepository extends JpaRepository<PhoneBookJpaEntity, Long> {

    List<PhoneBookJpaEntity> findByUserId(Long userId);
}
