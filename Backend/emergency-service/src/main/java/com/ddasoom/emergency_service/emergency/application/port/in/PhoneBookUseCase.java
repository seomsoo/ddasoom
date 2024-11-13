package com.ddasoom.emergency_service.emergency.application.port.in;

import com.ddasoom.emergency_service.emergency.adapter.in.web.response.PhoneBookResponse;
import java.util.List;

public interface PhoneBookUseCase {

    void addPhoneBook(PhoneBookCommand phoneBookCommand);

    List<PhoneBookResponse> findPhoneBookList(Long userId);

    void sendMessage(SendMsgCommand sendMsgCommand);

    void deletePhoneBook(Long phoneBookId);
}
