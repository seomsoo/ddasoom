package com.ddasoom.user_service.user.application.port.in;

import com.ddasoom.user_service.user.adapter.in.web.response.LoginResponse;

public interface LoginUseCase {

    LoginResponse login(LoginCommand command);
}
