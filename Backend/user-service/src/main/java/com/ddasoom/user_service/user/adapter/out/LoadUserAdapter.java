package com.ddasoom.user_service.user.adapter.out;

import com.ddasoom.user_service.common.annotation.PersistenceAdapter;
import com.ddasoom.user_service.user.application.domain.User;
import com.ddasoom.user_service.user.application.port.out.LoadUserPort;
import com.ddasoom.user_service.user.error.UserNotFoundException;
import lombok.RequiredArgsConstructor;

@PersistenceAdapter
@RequiredArgsConstructor
public class LoadUserAdapter implements LoadUserPort {

    private final UserRepository userRepository;

    @Override
    public User loadUser(Long userId) {
        UserJpaEntity user = userRepository.findById(userId)
                .orElseThrow(UserNotFoundException::new);

        return new User(
                user.getId(),
                user.getEmail(),
                user.getName(),
                0
        );
    }

    @Override
    public User loadUser(String email) {
        UserJpaEntity user = userRepository.findByEmail(email)
                .orElseThrow(UserNotFoundException::new);

        //TODO: 연속 훈련일 수 받아오기

        return new User(
                user.getId(),
                user.getEmail(),
                user.getName(),
                0
        );
    }
}
