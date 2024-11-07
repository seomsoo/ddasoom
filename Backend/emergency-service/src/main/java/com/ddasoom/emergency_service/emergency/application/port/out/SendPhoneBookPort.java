package com.ddasoom.emergency_service.emergency.application.port.out;

import com.ddasoom.emergency_service.emergency.application.domain.PhoneBook;
import java.util.List;

public interface SendPhoneBookPort {
    void sendMessage(List<PhoneBook> phoneBookList, String text);
}
