package com.ddasoom.voice_service.voice.adapter.out;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VoiceRepository extends JpaRepository<VoiceJpaEntity, Long> {

    List<VoiceJpaEntity> findByUserId(Long userId);
}
