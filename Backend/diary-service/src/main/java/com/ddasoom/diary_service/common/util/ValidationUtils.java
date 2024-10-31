package com.ddasoom.diary_service.common.util;

import jakarta.validation.ConstraintViolation;
import jakarta.validation.ConstraintViolationException;
import jakarta.validation.Validation;
import jakarta.validation.Validator;
import java.util.Set;
import lombok.AccessLevel;
import lombok.NoArgsConstructor;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
public abstract class ValidationUtils {

    private static final Validator validator = Validation.buildDefaultValidatorFactory().getValidator();

    public static <T> void validate(T command) {
        Set<ConstraintViolation<T>> violations = validator.validate(command);
        if (!violations.isEmpty()) {
            throw new ConstraintViolationException(violations);
        }
    }
}
