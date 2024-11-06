package com.ddasoom.diary_service.diary.application.port.in;

import com.ddasoom.diary_service.diary.adapter.in.web.response.PanicSimpleResponse;

public interface PanicUseCase {

    void savePanic(PanicCommand panicCommand);
    void savePanicDescription(PanicDescriptionCommand descriptionCommand);
    PanicSimpleResponse getPanicSimple(Long userId);
}
