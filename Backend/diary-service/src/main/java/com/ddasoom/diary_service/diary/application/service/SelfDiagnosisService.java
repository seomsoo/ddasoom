package com.ddasoom.diary_service.diary.application.service;

import com.ddasoom.diary_service.common.annotation.UseCase;
import com.ddasoom.diary_service.diary.application.port.in.SelfDiagnosisUseCase;
import com.ddasoom.diary_service.diary.application.port.out.SelfDiagnosisPort;
import lombok.RequiredArgsConstructor;

@UseCase
@RequiredArgsConstructor
public class SelfDiagnosisService implements SelfDiagnosisUseCase {

    private final SelfDiagnosisPort selfDiagnosisPort;

    @Override
    public void saveSelfDiagnosis(Long userId, int panicDoubtCount) {
        selfDiagnosisPort.saveSelfDiagnosis(userId, panicDoubtCount);
    }
}
