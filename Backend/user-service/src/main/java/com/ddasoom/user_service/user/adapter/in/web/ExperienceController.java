package com.ddasoom.user_service.user.adapter.in.web;

import com.ddasoom.user_service.common.annotation.WebAdapter;
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

    @PutMapping("/api/users/exp-up")
    public void updateDdasomiExperience(@RequestHeader("X-Authenticated-User") Long userId,
            @RequestBody String trainingType) {
        ddasomiInfoUseCase.updateDdasomiExperience(userId);
        ddasomiInfoUseCase.updateDdasomiInteraction(userId, trainingType);
    }
}
