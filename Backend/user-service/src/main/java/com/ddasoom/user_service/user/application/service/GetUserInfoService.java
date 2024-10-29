package com.ddasoom.user_service.user.application.service;

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
                user.continuousTrainingDays()
        );
    }
}
