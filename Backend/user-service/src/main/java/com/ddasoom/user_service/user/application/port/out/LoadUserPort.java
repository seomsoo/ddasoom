package com.ddasoom.user_service.user.application.port.out;

import com.ddasoom.user_service.user.application.domain.User;

public interface LoadUserPort {

    User loadUser(String email);
}