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
    public User loadUser(String email) {
        UserJpaEntity user = userRepository.findByEmail(email)
                .orElseThrow(UserNotFoundException::new);

        return new User(
                user.getId(),
                user.getEmail(),
                user.getName()
        );
    }
}
