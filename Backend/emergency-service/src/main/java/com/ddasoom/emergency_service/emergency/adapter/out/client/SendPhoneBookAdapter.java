package com.ddasoom.emergency_service.emergency.adapter.out.client;

import com.ddasoom.emergency_service.common.annotation.ApiAdapter;
import com.ddasoom.emergency_service.common.config.MsgApiKeyConfig;
import com.ddasoom.emergency_service.emergency.application.domain.PhoneBook;
import com.ddasoom.emergency_service.emergency.application.port.out.SendPhoneBookPort;
import java.util.List;

import lombok.extern.slf4j.Slf4j;
import net.nurigo.sdk.NurigoApp;
import net.nurigo.sdk.message.exception.NurigoEmptyResponseException;
import net.nurigo.sdk.message.exception.NurigoMessageNotReceivedException;
import net.nurigo.sdk.message.exception.NurigoUnknownException;
import net.nurigo.sdk.message.model.Message;
import net.nurigo.sdk.message.service.DefaultMessageService;

@ApiAdapter
@Slf4j
public class SendPhoneBookAdapter implements SendPhoneBookPort {

    private final DefaultMessageService messageService;
    private final MsgApiKeyConfig msgApiKey;

    public SendPhoneBookAdapter(MsgApiKeyConfig msgApiKey) {
        this.msgApiKey = msgApiKey;
        this.messageService = NurigoApp.INSTANCE.initialize(
                msgApiKey.getApiKey(),
                msgApiKey.getApiSecret(),
                "https://api.coolsms.co.kr"
        );
    }

    @Override
    public void sendMessage(List<PhoneBook> phoneBookList, String text) {
        for(PhoneBook phoneBook : phoneBookList) {
            Message message = new Message();
            message.setFrom(msgApiKey.getSendNumber());
            message.setTo(phoneBook.phoneNumber());
            message.setText(text);

            try {
                messageService.send(message);
            } catch (NurigoMessageNotReceivedException | NurigoEmptyResponseException | NurigoUnknownException e) {
                log.error("SMS error: {}", e.getMessage());
            }
        }
    }
}
