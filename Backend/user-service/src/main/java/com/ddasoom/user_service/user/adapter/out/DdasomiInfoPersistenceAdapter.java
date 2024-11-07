package com.ddasoom.user_service.user.adapter.out;

import com.ddasoom.user_service.common.annotation.PersistenceAdapter;
import com.ddasoom.user_service.user.application.port.out.UpdateDdasomiInfoPort;
import com.ddasoom.user_service.user.error.DdasomiInfoNotFoundException;
import lombok.RequiredArgsConstructor;

@PersistenceAdapter
@RequiredArgsConstructor
public class DdasomiInfoPersistenceAdapter implements UpdateDdasomiInfoPort {

    private final DdasomiInfoRepository ddasomiInfoRepository;

    @Override
    public void updateDdasomiInfo(Long userId) {
        ddasomiInfoRepository.findByUserId(userId)
                .orElseThrow(DdasomiInfoNotFoundException::new)
                .updateExperience();
    }
}
