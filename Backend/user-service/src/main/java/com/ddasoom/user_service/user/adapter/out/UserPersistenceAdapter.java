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
    private final DdasomiInfoRepository ddasomiInfoRepository;

    @Override
    public void createUser(User user) {
        if (isDuplicated(user)) {
            throw new DuplicatedUserException();
        }

        UserJpaEntity userJpaEntity = userRepository.save(createUserJpaEntity(user));
        ddasomiInfoRepository.save(createDdasomiInfoJpaEntity(userJpaEntity));
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

    private static DdasomiInfoJpaEntity createDdasomiInfoJpaEntity(UserJpaEntity userJpaEntity) {
        return DdasomiInfoJpaEntity.builder()
                .user(userJpaEntity)
                .experience(0)
                .build();
    }
}
