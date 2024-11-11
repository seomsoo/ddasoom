package com.ddasoom.user_service.user.application.service;

import static com.ddasoom.user_service.user.application.domain.DdasomiLevelExperience.getNowLevel;
import static com.ddasoom.user_service.user.application.domain.DdasomiLevelExperience.getNowPercent;

import com.ddasoom.user_service.common.annotation.UseCase;
import com.ddasoom.user_service.user.adapter.in.web.response.GetUserInfoResponse;
import com.ddasoom.user_service.user.application.domain.User;
import com.ddasoom.user_service.user.application.port.in.GetUserInfoQuery;
import com.ddasoom.user_service.user.application.port.out.LoadUserPort;
import lombok.RequiredArgsConstructor;
import org.springframework.transaction.annotation.Transactional;

@UseCase
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class GetUserInfoService implements GetUserInfoQuery {

    private final LoadUserPort loadUserPort;

    @Override
    public GetUserInfoResponse getUserInfo(Long userId) {
        User user = loadUserPort.loadUser(userId);

        return new GetUserInfoResponse(
                user.name(),
                user.continuousTrainingDays(),
                user.experience(),
                getNowLevel(user.experience()),
                getNowPercent(user.experience()),
                user.strokeCount(),
                user.hugCount(),
                user.playCount()
        );
    }
}
