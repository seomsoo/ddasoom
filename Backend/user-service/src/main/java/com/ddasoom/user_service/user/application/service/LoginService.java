package com.ddasoom.user_service.user.application.service;

import com.ddasoom.user_service.common.annotation.UseCase;
import com.ddasoom.user_service.user.adapter.in.web.response.LoginResponse;
import com.ddasoom.user_service.user.application.domain.User;
import com.ddasoom.user_service.user.application.port.in.LoginCommand;
import com.ddasoom.user_service.user.application.port.in.LoginUseCase;
import com.ddasoom.user_service.user.application.port.out.LoadUserPort;
import com.ddasoom.user_service.user.application.port.out.TokenGeneratePort;
import lombok.RequiredArgsConstructor;
import org.springframework.transaction.annotation.Transactional;

@UseCase
@Transactional
@RequiredArgsConstructor
public class LoginService implements LoginUseCase {

    private final LoadUserPort loadUserPort;
    private final TokenGeneratePort tokenGeneratePort;

    @Override
    public LoginResponse login(LoginCommand command) {
        User user = loadUserPort.loadUser(command.email());

        String token = tokenGeneratePort.generate(user.id(), user.name());

        return new LoginResponse(
                user.id(),
                token
        );
    }
}
