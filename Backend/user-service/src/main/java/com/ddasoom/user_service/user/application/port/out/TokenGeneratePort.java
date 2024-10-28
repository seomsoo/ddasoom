package com.ddasoom.user_service.user.application.port.out;

public interface TokenGeneratePort {

    String generate(Long id, String name);

}
