package com.ddasoom.user_service.user.adapter.out;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "ddasomi_info")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class DdasomiInfoJpaEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ddasomi_info_id")
    private Long id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private UserJpaEntity user;

    private Integer experience;

    private Integer strokeCount = 0;

    private Integer hugCount = 0;

    private Integer playCount = 0;

    @Builder
    private DdasomiInfoJpaEntity(UserJpaEntity user, Integer experience) {
        this.user = user;
        this.experience = experience;
    }

    void updateExperience() {
        this.experience += 5;
    }

    void updateInteraction(String trainingType) {
        switch (trainingType) {
            case "BREATH":
                strokeCount += 5;
                break;
            case "GROUNDING":
                hugCount += 5;
                break;
            case "COMEDOWN":
                playCount += 5;
                break;
        }
    }
}
