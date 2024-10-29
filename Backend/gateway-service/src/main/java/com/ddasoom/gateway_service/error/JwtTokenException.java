package com.ddasoom.gateway_service.error;

public class JwtTokenException extends RuntimeException {

    public JwtTokenException(String message) {
        super(message);
    }
}
