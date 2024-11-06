package com.ddasoom.emergency_service.emergency.application.service;

import com.ddasoom.emergency_service.common.annotation.UseCase;
import com.ddasoom.emergency_service.emergency.adapter.in.web.response.PanicSimpleResponse;
import com.ddasoom.emergency_service.emergency.application.domain.PanicSimple;
import com.ddasoom.emergency_service.emergency.application.port.in.PanicUseCase;
import com.ddasoom.emergency_service.emergency.application.port.out.PanicPort;
import lombok.RequiredArgsConstructor;

@UseCase
@RequiredArgsConstructor
public class PanicService implements PanicUseCase {

    private final PanicPort panicPort;

    @Override
    public PanicSimpleResponse getPanicSimple(Long userId) {
        PanicSimple panic = panicPort.getPanicSimple(userId);

        return new PanicSimpleResponse(
                panic.panicId(),
                panic.startDate(),
                panic.duration(),
                panic.address()
        );
    }
}
