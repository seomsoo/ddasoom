package com.ddasoom.diary_service.diary.adapter.out.selfDiagnosis;

import com.ddasoom.diary_service.common.annotation.PersistenceAdapter;
import com.ddasoom.diary_service.diary.application.port.out.SelfDiagnosisPort;
import lombok.RequiredArgsConstructor;

@PersistenceAdapter
@RequiredArgsConstructor
public class SelfDiagnosisAdapter implements SelfDiagnosisPort {

    private final SelfDiagnosisRepository selfDiagnosisRepository;

    @Override
    public void saveSelfDiagnosis(Long userId, int panicDoubtCount) {
        selfDiagnosisRepository.save(
                SelfDiagnosisJpaEntity.builder()
                        .userId(userId)
                        .panicDoubtCount(panicDoubtCount)
                        .build()
        );
    }
}
