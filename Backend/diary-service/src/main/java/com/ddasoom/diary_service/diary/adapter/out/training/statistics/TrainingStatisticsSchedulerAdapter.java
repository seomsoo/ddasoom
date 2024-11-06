package com.ddasoom.diary_service.diary.adapter.out.training.statistics;

import static java.time.LocalDate.now;

import com.ddasoom.diary_service.common.annotation.PersistenceAdapter;
import com.ddasoom.diary_service.diary.adapter.out.training.TrainingRepository;
import com.ddasoom.diary_service.diary.adapter.out.users.UserRepository;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import java.time.LocalDate;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.transaction.annotation.Transactional;

@PersistenceAdapter
@RequiredArgsConstructor
public class TrainingStatisticsSchedulerAdapter {

    private final UserRepository userRepository;
    private final TrainingStatisticsRepository trainingStatisticsRepository;
    private final TrainingRepository trainingRepository;

    @PersistenceContext
    private EntityManager entityManager;

    //TODO: 사용자가 많아졌을 경우 List의 메모리 관리를 어떻게?
    @Transactional
    @Scheduled(cron = "1 0 0 * * *")
    public void updateContinuousTrainingStatistics() {
        for (Long userId : userRepository.findAllUserId()) {
            trainingStatisticsRepository.findByUserId(userId).ifPresentOrElse((trainingStatistic) -> {
                        LocalDate lastTrainingDate = trainingRepository.findLastTrainingDateBy(userId, now());

                        //연속이 아닌경우
                        if (lastTrainingDate == null || !lastTrainingDate.plusDays(1).isEqual(now())) {
                            trainingStatistic.initTrainingContinuousDay();
                        } else if (lastTrainingDate.plusDays(1).isEqual(now())) {
                            //연속인 경우
                            trainingStatistic.addTrainingContinuousDay();
                        }
                    }
                    , () -> {
                        //통계 테이블에 데이터가 없는 경우
                        int count = calculateContinuousDay(userId);
                        trainingStatisticsRepository.save(TrainingStatisticsJpaEntity.builder()
                                .trainingContinuousDay(count)
                                .userId(userId)
                                .build());
                    }
            );

            entityManager.flush();
            entityManager.clear();
        }
    }

    //매주 수,일요일 00시 30분에 연속 훈련 횟수가 잘 저장되었는지 점검
    @Transactional
    @Scheduled(cron = "0 30 0 * * 3,0")
    public void checkValidAndUpdate() {
        for (Long userId : userRepository.findAllUserId()) {
            final int continuousDay = calculateContinuousDay(userId);

            trainingStatisticsRepository.findByUserId(userId).ifPresentOrElse((trainingStatistic) -> {
                        trainingStatistic.setTrainingContinuousDay(continuousDay);
                    }
                    , () -> {
                        trainingStatisticsRepository.save(TrainingStatisticsJpaEntity.builder()
                                .trainingContinuousDay(continuousDay)
                                .userId(userId)
                                .build());
                    }
            );

            entityManager.flush();
            entityManager.clear();
        }
    }

    private int calculateContinuousDay(Long userId) {
        List<LocalDate> trainingDates = trainingRepository.findTrainingDateBy(userId, now());

        int count = trainingDates.isEmpty() ? 0 : 1;
        for (int i = 0; i < trainingDates.size() - 1; i++) {
            if (trainingDates.get(i).isEqual(trainingDates.get(i + 1).plusDays(1))) {
                count++;
                continue;
            }
            break;
        }
        return count;
    }
}
