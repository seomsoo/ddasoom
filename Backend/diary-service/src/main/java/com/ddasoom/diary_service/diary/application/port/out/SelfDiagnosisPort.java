package com.ddasoom.diary_service.diary.application.port.out;

import com.ddasoom.diary_service.diary.application.domain.GetSelfDiagnosisDto;

public interface SelfDiagnosisPort {

    void saveSelfDiagnosis(Long userId, int panicDoubtCount);

    GetSelfDiagnosisDto getSelfDiagnosis(Long userId, int year, int month);
}
