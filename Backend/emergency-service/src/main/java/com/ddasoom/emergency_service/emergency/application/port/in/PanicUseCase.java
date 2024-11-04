package com.ddasoom.emergency_service.emergency.application.port.in;

import com.ddasoom.emergency_service.emergency.adapter.in.web.response.PanicSimpleResponse;

public interface PanicUseCase {

    PanicSimpleResponse getPanicSimple(Long userId);
}
