package com.ddasoom.user_service.user.adapter.out;

import com.ddasoom.user_service.common.annotation.PersistenceAdapter;
import com.ddasoom.user_service.user.application.domain.User;
import com.ddasoom.user_service.user.application.port.out.CreateUserPort;
import com.ddasoom.user_service.user.error.DuplicatedUserException;
import lombok.RequiredArgsConstructor;

@PersistenceAdapter
@RequiredArgsConstructor
public class UserPersistenceAdapter implements CreateUserPort {

    private final UserRepository userRepository;

    @Override
    public void createUser(User user) {
        if (isDuplicated(user)) {
            throw new DuplicatedUserException();
        }

        userRepository.save(createUserJpaEntity(user));
    }

    private boolean isDuplicated(User user) {
        return userRepository.existsByEmail(user.email());
    }

    private UserJpaEntity createUserJpaEntity(User user) {
        return UserJpaEntity.builder()
                .email(user.email())
                .name(user.name())
                .build();
    }
}
