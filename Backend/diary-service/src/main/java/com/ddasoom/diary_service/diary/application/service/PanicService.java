package com.ddasoom.diary_service.diary.application.service;

import com.ddasoom.diary_service.common.annotation.UseCase;
import com.ddasoom.diary_service.diary.application.domain.PanicRecordInfo;
import com.ddasoom.diary_service.diary.application.port.in.PanicCommand;
import com.ddasoom.diary_service.diary.application.port.in.PanicDescriptionCommand;
import com.ddasoom.diary_service.diary.application.port.in.PanicUseCase;
import com.ddasoom.diary_service.diary.application.port.out.PanicRecordPort;
import lombok.RequiredArgsConstructor;
import org.springframework.transaction.annotation.Transactional;

@Transactional
@UseCase
@RequiredArgsConstructor
public class PanicService implements PanicUseCase {

    private final PanicRecordPort panicRecordPort;

    @Override
    public void savePanic(PanicCommand command) {
        PanicRecordInfo panic = new PanicRecordInfo(
                command.userId(),
                command.duration(),
                command.latitude(),
                command.longitude(),
                command.address(),
                command.description()
        );

        panicRecordPort.savePanicRecord(panic);
    }

    @Override
    public void savePanicDescription(PanicDescriptionCommand command) {
        panicRecordPort.savePanicDescription(command);
    }
}