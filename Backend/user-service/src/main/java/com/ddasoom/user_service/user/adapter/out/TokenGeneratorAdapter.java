package com.ddasoom.user_service.user.adapter.out;

import com.ddasoom.user_service.user.application.port.out.TokenGeneratePort;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class TokenGeneratorAdapter implements TokenGeneratePort {

    private final JwtGenerator jwtGenerator;

    @Override
    public String generate(Long id, String name) {
        return jwtGenerator.generate(id, name);
    }
}
