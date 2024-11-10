package com.ddasoom.emergency_service.emergency.adapter.in.web;

import static com.ddasoom.emergency_service.common.util.ApiUtils.success;
import static org.springframework.http.HttpStatus.*;

import com.ddasoom.emergency_service.common.annotation.WebAdapter;
import com.ddasoom.emergency_service.common.util.ApiUtils.ApiResult;
import com.ddasoom.emergency_service.emergency.adapter.in.web.request.AddPhoneRequest;
import com.ddasoom.emergency_service.emergency.adapter.in.web.response.PhoneBookResponse;
import com.ddasoom.emergency_service.emergency.application.port.in.PhoneBookCommand;
import com.ddasoom.emergency_service.emergency.application.port.in.PhoneBookUseCase;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@WebAdapter
@RestController
@RequiredArgsConstructor
public class PhoneBookController {

    private final PhoneBookUseCase phoneBookUseCase;

    @ResponseStatus(CREATED)
    @PostMapping("/api/emergency/phone-book")
    public void AddPhoneBook(@RequestHeader("X-Authenticated-User") Long userId,
            @RequestBody AddPhoneRequest request) {
        PhoneBookCommand command = new PhoneBookCommand(
                userId,
                request.phoneNumber(),
                request.alias()
        );

        phoneBookUseCase.addPhoneBook(command);
    }

    @GetMapping("/api/emergency/phone-books")
    public ApiResult<List<PhoneBookResponse>> getPhoneBooks(@RequestHeader("X-Authenticated-User") Long userId) {
        return success(phoneBookUseCase.findPhoneBookList(userId));
    }

    @ResponseStatus(OK)
    @PostMapping("api/emergency/send-message")
    public void sendMessage(@RequestHeader("X-Authenticated-User") Long userId,
            @RequestBody String username) {
        phoneBookUseCase.sendMessage(userId, username);
    }

    @ResponseStatus(NO_CONTENT)
    @DeleteMapping("api/emergency/phone-book/{phoneBookId}")
    public void deletePhoneBook(@PathVariable Long phoneBookId) {
        phoneBookUseCase.deletePhoneBook(phoneBookId);
    }
}
