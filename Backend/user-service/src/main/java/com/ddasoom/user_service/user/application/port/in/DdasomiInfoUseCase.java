package com.ddasoom.user_service.user.application.port.in;

public interface DdasomiInfoUseCase {

    void updateDdasomiExperience(Long userId);

    void updateDdasomiInteraction(Long userId, String trainingType);
}
