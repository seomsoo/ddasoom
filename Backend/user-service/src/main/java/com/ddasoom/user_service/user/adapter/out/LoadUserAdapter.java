package com.ddasoom.user_service.user.adapter.out;

import com.ddasoom.user_service.common.annotation.PersistenceAdapter;
import com.ddasoom.user_service.user.adapter.out.diary.DiaryServiceClient;
import com.ddasoom.user_service.user.adapter.out.diary.GetTrainingContinuousDaysResponse;
import com.ddasoom.user_service.user.application.domain.User;
import com.ddasoom.user_service.user.application.port.out.LoadUserPort;
import com.ddasoom.user_service.user.error.DdasomiInfoNotFoundException;
import com.ddasoom.user_service.user.error.UserNotFoundException;
import lombok.RequiredArgsConstructor;

@PersistenceAdapter
@RequiredArgsConstructor
public class LoadUserAdapter implements LoadUserPort {

    private final UserRepository userRepository;
    private final DiaryServiceClient diaryServiceClient;
    private final DdasomiInfoRepository ddasomiInfoRepository;

    @Override
    public User loadUser(Long userId) {
        UserJpaEntity user = userRepository.findById(userId)
                .orElseThrow(UserNotFoundException::new);

        DdasomiInfoJpaEntity ddasomi = ddasomiInfoRepository.findByUser(user)
                .orElseThrow(DdasomiInfoNotFoundException::new);

        GetTrainingContinuousDaysResponse diaryClientResponse = diaryServiceClient.getContinuousTrainingDays(userId);

        return new User(
                user.getId(),
                user.getEmail(),
                user.getName(),
                diaryClientResponse.continuousTrainingDays(),
                ddasomi.getExperience()
        );
    }

    @Override
    public User loadUser(String email) {
        UserJpaEntity user = userRepository.findByEmail(email)
                .orElseThrow(UserNotFoundException::new);

        DdasomiInfoJpaEntity ddasomi = ddasomiInfoRepository.findByUser(user)
                .orElseThrow(DdasomiInfoNotFoundException::new);

        GetTrainingContinuousDaysResponse diaryClientResponse = diaryServiceClient.getContinuousTrainingDays(
                user.getId());

        return new User(
                user.getId(),
                user.getEmail(),
                user.getName(),
                diaryClientResponse.continuousTrainingDays(),
                ddasomi.getExperience()
        );
    }
}
