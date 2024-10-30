package com.ddasoom.voice_service.common.util;

import static jakarta.validation.Validation.buildDefaultValidatorFactory;
import static lombok.AccessLevel.PRIVATE;

import jakarta.validation.ConstraintViolation;
import jakarta.validation.ConstraintViolationException;
import jakarta.validation.Validator;
import java.util.Set;
import lombok.NoArgsConstructor;

@NoArgsConstructor(access = PRIVATE)
public abstract class ValidationUtils {

    private static final Validator validator = buildDefaultValidatorFactory().getValidator();

    public static <T> void validate(T command) {
        Set<ConstraintViolation<T>> violations = validator.validate(command);
        if (!violations.isEmpty()) {
            throw new ConstraintViolationException(violations);
        }
    }
}
