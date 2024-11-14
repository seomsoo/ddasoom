package com.ddasoom.diary_service.diary.application.port.out;

public interface SelfDiagnosisPort {

    void saveSelfDiagnosis(Long userId, int panicDoubtCount);
}
