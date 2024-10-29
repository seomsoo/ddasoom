package com.ddasoom.emergency_service.emergency.adapter.out;

import com.ddasoom.emergency_service.common.annotation.PersistenceAdapter;
import com.ddasoom.emergency_service.emergency.application.domain.PhoneBook;
import com.ddasoom.emergency_service.emergency.application.port.out.AddPhoneBookPort;
import lombok.RequiredArgsConstructor;

@PersistenceAdapter
@RequiredArgsConstructor
public class PhoneBookBookPersistenceAdapter implements AddPhoneBookPort {

    private final PhoneBookRepository phoneBookRepository;

    @Override
    public void addPhone(PhoneBook phoneBook) {
        phoneBookRepository.save(new PhoneBookJpaEntity(
                phoneBook.userId(),
                phoneBook.phoneNumber(),
                phoneBook.alias()
        ));
    }
}
