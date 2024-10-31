package com.ddasoom.gateway_service.error;

import static com.ddasoom.gateway_service.util.ApiUtils.error;

import com.auth0.jwt.exceptions.AlgorithmMismatchException;
import com.auth0.jwt.exceptions.JWTDecodeException;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.exceptions.TokenExpiredException;
import com.ddasoom.gateway_service.util.ApiUtils.ApiResult;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class AuthorizationExceptionHandler {

    @ExceptionHandler(InvalidAuthorizationHeaderException.class)
    public ResponseEntity<ApiResult<?>> handleInvalidAuthorizationHeaderException(Exception e) {
        return newResponse(e, HttpStatus.UNAUTHORIZED);
    }

    @ExceptionHandler(JWTDecodeException.class)
    public ResponseEntity<ApiResult<?>> handleJWTDecodeException(Exception e) {
        return newResponse("유효하지 않은 토큰입니다.", HttpStatus.UNAUTHORIZED);
    }

    @ExceptionHandler(TokenExpiredException.class)
    public ResponseEntity<ApiResult<?>> handleTokenExpiredException(Exception e) {
        return newResponse("토큰의 유효시간이 만료되었습니다.", HttpStatus.UNAUTHORIZED);
    }

    @ExceptionHandler(AlgorithmMismatchException.class)
    public ResponseEntity<ApiResult<?>> handleAlgorithmMismatchException(Exception e) {
        return newResponse("제공된 알고리즘이 토큰 헤더에 정의된 알고리즘과 일치하지 않습니다.", HttpStatus.UNAUTHORIZED);
    }

    @ExceptionHandler(JWTVerificationException.class)
    public ResponseEntity<ApiResult<?>> handleJWTVerificationException(Exception e) {
        return newResponse(e, HttpStatus.UNAUTHORIZED);
    }

    @ExceptionHandler({Exception.class, RuntimeException.class})
    public ResponseEntity<ApiResult<?>> handleException(Exception e) {
        return newResponse(e, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    private ResponseEntity<ApiResult<?>> newResponse(Throwable throwable, HttpStatus status) {
        return newResponse(throwable.getMessage(), status);
    }

    private ResponseEntity<ApiResult<?>> newResponse(String message, HttpStatus status) {
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json");
        return new ResponseEntity<>(error(message, status), headers, status);
    }

}