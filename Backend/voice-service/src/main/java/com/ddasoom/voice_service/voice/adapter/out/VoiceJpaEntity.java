package com.ddasoom.voice_service.voice.adapter.out;

import static lombok.AccessLevel.PROTECTED;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = PROTECTED)
public class VoiceJpaEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "voice_id")
    private Long id;

    private Long userId;

    private String voiceName;

    private String voiceKey;

    @Builder
    private VoiceJpaEntity(Long userId, String voiceName, String voiceKey) {
        this.userId = userId;
        this.voiceName = voiceName;
        this.voiceKey = voiceKey;
    }
}
