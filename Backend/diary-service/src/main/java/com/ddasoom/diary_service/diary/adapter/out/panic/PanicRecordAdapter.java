package com.ddasoom.diary_service.diary.adapter.out.panic;

import com.ddasoom.diary_service.common.annotation.PersistenceAdapter;
import com.ddasoom.diary_service.diary.application.domain.PanicRecordInfo;
import com.ddasoom.diary_service.diary.application.port.in.PanicDescriptionCommand;
import com.ddasoom.diary_service.diary.application.port.out.PanicRecordPort;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@PersistenceAdapter
@RequiredArgsConstructor
@Slf4j
public class PanicRecordAdapter implements PanicRecordPort {

    private final PanicRepository panicRepository;

    @Override
    public List<PanicRecordInfo> getPanicRecord(Long userId, int year, int month, int day) {
        return panicRepository.findByUserIdAndDate(userId, year, month, day)
                .stream()
                .map(PanicJpaEntity::toRecordInfo)
                .toList();
    }

    @Override
    public void savePanicRecord(PanicRecordInfo panic) {
        panicRepository.save(new PanicJpaEntity(
                panic.userId(),
                panic.duration(),
                panic.latitude(),
                panic.longitude(),
                panic.address(),
                panic.description()
        ));
    }

    @Override
    public void savePanicDescription(PanicDescriptionCommand command) {
        panicRepository.findById(command.panicId())
                .ifPresentOrElse(
                        panic -> panic.saveDescription(command.description()),
                        () -> log.error("panicRecord not found for id: {}", command.panicId())
                );
    }
}
