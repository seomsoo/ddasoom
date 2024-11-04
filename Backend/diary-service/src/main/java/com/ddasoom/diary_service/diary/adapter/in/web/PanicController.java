package com.ddasoom.diary_service.diary.adapter.in.web;

import static com.ddasoom.diary_service.common.util.ApiUtils.success;

import com.ddasoom.diary_service.common.annotation.WebAdapter;
import com.ddasoom.diary_service.common.util.ApiUtils.ApiResult;
import com.ddasoom.diary_service.diary.adapter.in.web.response.PanicSimpleResponse;
import com.ddasoom.diary_service.diary.application.port.in.PanicUseCase;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@WebAdapter
@RestController
@RequiredArgsConstructor
public class PanicController {

    private final PanicUseCase panicUseCase;

    @GetMapping("/api/diary/user/{userId}/panic-simple")
    public ApiResult<PanicSimpleResponse> getPanicSimple(@PathVariable Long userId) {
        return success(panicUseCase.getPanicSimple(userId));
    }
}
