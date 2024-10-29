package com.ddasoom.emergency_service.emergency.application.service;

import com.ddasoom.emergency_service.common.annotation.UseCase;
import com.ddasoom.emergency_service.emergency.application.domain.PhoneBook;
import com.ddasoom.emergency_service.emergency.application.port.in.PhoneBookCommand;
import com.ddasoom.emergency_service.emergency.application.port.in.PhoneBookUseCase;
import com.ddasoom.emergency_service.emergency.application.port.out.AddPhoneBookPort;
import lombok.RequiredArgsConstructor;
import org.springframework.transaction.annotation.Transactional;

@UseCase
@Transactional
@RequiredArgsConstructor
public class phoneBookService implements PhoneBookUseCase {

    private final AddPhoneBookPort addPhoneBookPort;

    @Override
    public void addPhone(PhoneBookCommand command) {
        PhoneBook phoneBook = new PhoneBook(
                command.userId(),
                command.phoneNumber(),
                command.alias()
        );

        addPhoneBookPort.addPhone(phoneBook);
    }
}
