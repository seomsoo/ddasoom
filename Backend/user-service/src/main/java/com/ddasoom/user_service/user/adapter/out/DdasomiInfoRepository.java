package com.ddasoom.user_service.user.adapter.out;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DdasomiInfoRepository extends JpaRepository<DdasomiInfoJpaEntity, Long> {

    Optional<DdasomiInfoJpaEntity> findByUser(UserJpaEntity user);

    Optional<DdasomiInfoJpaEntity> findByUserId(Long userId);

}
