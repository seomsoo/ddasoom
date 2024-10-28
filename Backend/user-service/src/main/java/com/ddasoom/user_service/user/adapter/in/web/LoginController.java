package com.ddasoom.user_service.user.adapter.in.web;

import static com.ddasoom.user_service.common.util.ApiUtils.success;

import com.ddasoom.user_service.common.annotation.WebAdapter;
import com.ddasoom.user_service.common.util.ApiUtils.ApiResult;
import com.ddasoom.user_service.user.adapter.in.web.request.LoginRequest;
import com.ddasoom.user_service.user.adapter.in.web.response.LoginResponse;
import com.ddasoom.user_service.user.application.port.in.LoginCommand;
import com.ddasoom.user_service.user.application.port.in.LoginUseCase;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@WebAdapter
@RestController
@RequiredArgsConstructor
public class LoginController {

    private final LoginUseCase loginUseCase;

    @PostMapping("/api/users/login")
    public ApiResult<LoginResponse> login(@RequestBody LoginRequest request) {
        LoginCommand command = new LoginCommand(
                request.email(),
                request.name()
        );

        return success(loginUseCase.login(command));
    }
}
