package com.ddasoom.user_service.user.adapter.out;

import static com.auth0.jwt.algorithms.Algorithm.HMAC512;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTCreator;
import com.auth0.jwt.algorithms.Algorithm;
import com.ddasoom.user_service.user.application.port.out.TokenGeneratePort;
import java.util.Date;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class TokenGenerateAdapter implements TokenGeneratePort {

    private final String issuer;
    private final int expirySeconds;
    private final Algorithm algorithm;

    public TokenGenerateAdapter(
            @Value("${jwt.issuer}") String issuer,
            @Value("${jwt.client-secret}") String clientSecret,
            @Value("${jwt.expiry-seconds}") int expirySeconds
    ) {
        this.issuer = issuer;
        this.expirySeconds = expirySeconds;
        this.algorithm = HMAC512(clientSecret);
    }

    @Override
    public String generate(Long id, String name) {
        Date now = new Date();

        JWTCreator.Builder builder = JWT.create();
        builder.withIssuer(issuer);
        builder.withIssuedAt(now);

        if (expirySeconds > 0) {
            builder.withExpiresAt(new Date(now.getTime() + expirySeconds * 1_000L));
        }

        builder.withClaim("userId", id);
        builder.withClaim("userName", name);

        return builder.sign(algorithm);
    }
}
