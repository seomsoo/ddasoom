package com.ddasoom.user_service.user.adapter.in.web;

import static org.springframework.http.HttpStatus.CREATED;

import com.ddasoom.user_service.common.annotation.WebAdapter;
import com.ddasoom.user_service.user.adapter.in.web.request.JoinRequest;
import com.ddasoom.user_service.user.application.port.in.JoinCommand;
import com.ddasoom.user_service.user.application.port.in.JoinUseCase;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@WebAdapter
@RestController
@RequiredArgsConstructor
public class JoinController {

    private final JoinUseCase joinUseCase;

    @ResponseStatus(CREATED)
    @PostMapping("/api/users")
    public void join(@RequestBody JoinRequest request) {
        JoinCommand command = new JoinCommand(
                request.email(),
                request.name()
        );

        joinUseCase.join(command);
    }
}
