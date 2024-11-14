package com.ddasoom.diary_service.diary.application.port.in;

public interface SelfDiagnosisUseCase {

    void saveSelfDiagnosis(Long userId, int panicDoubtCount);
}
