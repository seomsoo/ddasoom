package com.ddasoom.emergency_service.emergency.application.port.out;

import com.ddasoom.emergency_service.emergency.application.domain.PanicSimple;

public interface PanicPort {

    PanicSimple getPanicSimple(Long userId);
}
