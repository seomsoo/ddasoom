package com.ddasoom.user_service.user.adapter.in.web;

import com.ddasoom.user_service.common.annotation.WebAdapter;
import com.ddasoom.user_service.user.adapter.in.web.request.InteractionRequest;
import com.ddasoom.user_service.user.application.port.in.DdasomiInfoUseCase;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

@WebAdapter
@RestController
@RequiredArgsConstructor
public class ExperienceController {

    private final DdasomiInfoUseCase ddasomiInfoUseCase;

    @PutMapping("/api/users/daily/exp-up")
    public void updateDdasomiExperienceDaily(@RequestHeader("X-Authenticated-User") Long userId) {
        ddasomiInfoUseCase.updateDdasomiExperienceDaily(userId);
    }

    @PutMapping("/api/users/training/exp-up")
    public void updateDdasomiExperienceTraining(@RequestHeader("X-Authenticated-User") Long userId,
            @RequestBody String trainingType) {
        ddasomiInfoUseCase.updateDdasomiExperienceTraining(userId, trainingType);
    }

    @PutMapping("/api/users/interaction")
    public void updateDdasomiInteraction(@RequestHeader("X-Authenticated-User") Long userId, @RequestBody
    InteractionRequest request) {
        ddasomiInfoUseCase.executeInteraction(userId, request.interactionType());
    }
}