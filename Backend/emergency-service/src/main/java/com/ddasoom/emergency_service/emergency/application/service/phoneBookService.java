package com.ddasoom.emergency_service.emergency.application.service;

import com.ddasoom.emergency_service.common.annotation.UseCase;
import com.ddasoom.emergency_service.emergency.adapter.in.web.response.PhoneBookResponse;
import com.ddasoom.emergency_service.emergency.application.domain.PhoneBook;
import com.ddasoom.emergency_service.emergency.application.port.in.PhoneBookCommand;
import com.ddasoom.emergency_service.emergency.application.port.in.PhoneBookUseCase;
import com.ddasoom.emergency_service.emergency.application.port.out.AddPhoneBookPort;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.transaction.annotation.Transactional;

@UseCase
@Transactional
@RequiredArgsConstructor
public class phoneBookService implements PhoneBookUseCase {

    private final AddPhoneBookPort addPhoneBookPort;

    @Override
    public void addPhoneBook(PhoneBookCommand command) {
        PhoneBook phoneBook = new PhoneBook(
                null,
                command.userId(),
                command.phoneNumber(),
                command.alias()
        );

        addPhoneBookPort.addPhoneBook(phoneBook);
    }

    @Override
    public List<PhoneBookResponse> findPhoneBookList(Long userId) {
        List<PhoneBook> phoneBookList = addPhoneBookPort.findPhoneBookList(userId);

        return phoneBookList.stream().map(phoneBook ->
                new PhoneBookResponse(
                        phoneBook.phoneBookId(),
                        phoneBook.phoneNumber(),
                        phoneBook.alias())
        ).toList();
    }
}
