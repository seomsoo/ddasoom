package com.ddasoom.user_service.user.application.port.in;

public interface DdasomiInfoUseCase {

    void updateDdasomiExperienceDaily(Long userId);

    void updateDdasomiExperienceTraining(Long userId, String trainingType);

    void executeInteraction(Long userId, String interactionType);
}
