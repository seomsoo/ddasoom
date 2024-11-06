package com.ddasoom.emergency_service.emergency.application.port.out;

import com.ddasoom.emergency_service.emergency.application.domain.PhoneBook;
import java.util.List;

public interface PhoneBookPort {

    void addPhoneBook(PhoneBook phoneBook);

    List<PhoneBook> findPhoneBookList(Long userId);
}
