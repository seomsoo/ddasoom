package com.ddasoom.user_service.user.application.service;

import com.ddasoom.user_service.common.annotation.UseCase;
import com.ddasoom.user_service.user.application.port.in.DdasomiInfoUseCase;
import com.ddasoom.user_service.user.application.port.out.UpdateDdasomiInfoPort;
import lombok.RequiredArgsConstructor;
import org.springframework.transaction.annotation.Transactional;

@UseCase
@Transactional
@RequiredArgsConstructor
public class DdasomiInfoService implements DdasomiInfoUseCase {

    private final UpdateDdasomiInfoPort updateDdasomiInfoPort;

    @Override
    public void updateDdasomiExperience(Long userId) {
        updateDdasomiInfoPort.updateDdasomiInfo(userId);
    }

    @Override
    public void updateDdasomiInteraction(Long userId, String trainingType) {
        if (trainingType == null) {
            return;
        }

        updateDdasomiInfoPort.updateDdasomiInfo(userId, trainingType);
    }
}
