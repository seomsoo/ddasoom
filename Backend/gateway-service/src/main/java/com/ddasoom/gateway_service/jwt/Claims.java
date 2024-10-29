package com.ddasoom.gateway_service.jwt;

import com.auth0.jwt.interfaces.DecodedJWT;
import java.util.Date;

public record Claims(
        Long userId,
        String userName,
        Date iat,
        Date exp
) {

    Claims(DecodedJWT decodedJWT) {
        this(
                decodedJWT.getClaim("userId").asLong(),
                decodedJWT.getClaim("userName").asString(),
                decodedJWT.getIssuedAt(),
                decodedJWT.getExpiresAt()
        );
    }
}