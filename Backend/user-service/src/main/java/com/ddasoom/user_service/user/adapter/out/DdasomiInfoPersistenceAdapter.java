package com.ddasoom.user_service.user.adapter.out;

import com.ddasoom.user_service.common.annotation.PersistenceAdapter;
import com.ddasoom.user_service.user.application.port.out.UpdateDdasomiInfoPort;
import com.ddasoom.user_service.user.error.DdasomiInfoNotFoundException;
import lombok.RequiredArgsConstructor;

@PersistenceAdapter
@RequiredArgsConstructor
public class DdasomiInfoPersistenceAdapter implements UpdateDdasomiInfoPort {

    private final DdasomiInfoRepository ddasomiInfoRepository;

    @Override
    public void updateDdasomiExperienceDaily(Long userId) {
        ddasomiInfoRepository.findByUserId(userId)
                .orElseThrow(DdasomiInfoNotFoundException::new)
                .updateExperience();
    }

    @Override
    public void updateDdasomiExperienceTraining(Long userId, String trainingType) {
        DdasomiInfoJpaEntity ddasomiInfoJpaEntity = ddasomiInfoRepository.findByUserId(userId)
                .orElseThrow(DdasomiInfoNotFoundException::new);
        ddasomiInfoJpaEntity.updateExperience();
        ddasomiInfoJpaEntity.updateInteraction(trainingType);
    }

    @Override
    public void executeInteraction(Long userId, String interactionType) {
        ddasomiInfoRepository.findByUserId(userId)
                .orElseThrow(DdasomiInfoNotFoundException::new)
                .executeInteraction(interactionType);
    }
}
