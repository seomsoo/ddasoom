package com.ddasoom.user_service.user.application.port.out;

public interface UpdateDdasomiInfoPort {

    void updateDdasomiInfo(Long userId);

    void updateDdasomiInfo(Long userId, String trainingType);
}
