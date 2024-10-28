package com.ddasoom.user_service.user.application.service;

import com.ddasoom.user_service.common.annotation.UseCase;
import com.ddasoom.user_service.user.application.domain.User;
import com.ddasoom.user_service.user.application.port.in.JoinCommand;
import com.ddasoom.user_service.user.application.port.in.JoinUseCase;
import com.ddasoom.user_service.user.application.port.out.CreateUserPort;
import lombok.RequiredArgsConstructor;
import org.springframework.transaction.annotation.Transactional;

@UseCase
@Transactional
@RequiredArgsConstructor
public class JoinService implements JoinUseCase {

    private final CreateUserPort createUserPort;

    @Override
    public void join(JoinCommand command) {
        User user = new User(
                command.email(),
                command.name()
        );

        createUserPort.createUser(user);
    }
}
