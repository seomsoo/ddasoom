package com.ddasoom.emergency_service.emergency.adapter.out;

import com.ddasoom.emergency_service.common.annotation.PersistenceAdapter;
import com.ddasoom.emergency_service.emergency.application.domain.PhoneBook;
import com.ddasoom.emergency_service.emergency.application.port.out.PhoneBookPort;
import com.ddasoom.emergency_service.emergency.error.PhoneBookNotFoundException;
import java.util.List;
import lombok.RequiredArgsConstructor;

@PersistenceAdapter
@RequiredArgsConstructor
public class PhoneBookAdapter implements PhoneBookPort {

    private final PhoneBookRepository phoneBookRepository;

    @Override
    public void addPhoneBook(PhoneBook phoneBook) {
        phoneBookRepository.save(new PhoneBookJpaEntity(
                phoneBook.userId(),
                phoneBook.phoneNumber(),
                phoneBook.alias()
        ));
    }

    @Override
    public List<PhoneBook> findPhoneBookList(Long userId) {
        List<PhoneBookJpaEntity> phoneBooks = phoneBookRepository.findByUserId(userId);

        if (phoneBooks.isEmpty()) {
            throw new PhoneBookNotFoundException();
        }

        return phoneBooks.stream().map(phoneBook ->
                new PhoneBook(
                        phoneBook.getId(),
                        null,
                        phoneBook.getPhoneNumber(),
                        phoneBook.getAlias())
        ).toList();
    }
}
