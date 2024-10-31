package com.ddasoom.gateway_service.jwt;

import static com.auth0.jwt.algorithms.Algorithm.HMAC512;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.ddasoom.gateway_service.error.InvalidAuthorizationHeaderException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cloud.gateway.filter.GatewayFilterChain;
import org.springframework.cloud.gateway.filter.GlobalFilter;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;

@Component
public class JwtAuthenticationFilter implements GlobalFilter {

    private final JWTVerifier jwtVerifier;

    public JwtAuthenticationFilter(
            @Value("${jwt.issuer}") String issuer,
            @Value("${jwt.client-secret}") String clientSecret
    ) {
        this.jwtVerifier = JWT.require(HMAC512(clientSecret))
                .withIssuer(issuer)
                .build();
    }

    @Override
    public Mono<Void> filter(ServerWebExchange exchange, GatewayFilterChain chain) {
        if (checkIfLoginRequestOrJoinRequest(exchange)) {
            return chain.filter(exchange);
        }

        String token = getTokenFrom(exchange);
        Claims claims = verify(token);

        return chain.filter(
                addAuthenticatedUserHeader(exchange, claims)
        );
    }

    private boolean checkIfLoginRequestOrJoinRequest(ServerWebExchange exchange) {
        HttpMethod method = exchange.getRequest()
                .getMethod();

        String path = exchange.getRequest()
                .getURI()
                .getPath();

        return (method.equals(HttpMethod.POST) && path.equals("/api/users/login")) ||
                (method.equals(HttpMethod.POST) && path.equals("/api/users"));
    }

    private String getTokenFrom(ServerWebExchange exchange) {
        String authHeader = exchange.getRequest()
                .getHeaders()
                .getFirst(HttpHeaders.AUTHORIZATION);

        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            throw new InvalidAuthorizationHeaderException();
        }

        return authHeader.substring(7);
    }

    private Claims verify(String token) throws JWTVerificationException {
        return new Claims(jwtVerifier.verify(token));
    }

    private ServerWebExchange addAuthenticatedUserHeader(ServerWebExchange exchange, Claims claims) {
        return exchange.mutate()
                .request(builder -> builder.header("X-Authenticated-User", String.valueOf(claims.userId())))
                .build();
    }
}
