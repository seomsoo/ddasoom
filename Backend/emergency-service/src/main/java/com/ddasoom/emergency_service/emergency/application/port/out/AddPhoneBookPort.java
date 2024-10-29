package com.ddasoom.emergency_service.emergency.application.port.out;

import com.ddasoom.emergency_service.emergency.application.domain.PhoneBook;

public interface AddPhoneBookPort {

    void addPhone(PhoneBook phoneBook);
}
