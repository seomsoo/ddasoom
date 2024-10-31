package com.ddasoom.user_service.user.application.port.in;

import static com.ddasoom.user_service.common.util.ValidationUtils.validate;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;

public record JoinCommand(
        @NotEmpty @Email String email,
        @NotEmpty String name
) {

    public JoinCommand(String email, String name) {
        this.email = email;
        this.name = name;

        validate(this);
    }
}
