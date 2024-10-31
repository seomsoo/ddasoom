package com.ddasoom.voice_service.voice.adapter.in.web;

import static com.ddasoom.voice_service.common.util.ApiUtils.success;

import com.ddasoom.voice_service.common.annotation.WebAdapter;
import com.ddasoom.voice_service.common.util.ApiUtils.ApiResult;
import com.ddasoom.voice_service.voice.adapter.in.web.response.GetVoiceResponse;
import com.ddasoom.voice_service.voice.application.port.in.GetVoiceQuery;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

@WebAdapter
@RestController
@RequiredArgsConstructor
public class GetVoiceController {

    private final GetVoiceQuery getVoiceQuery;

    @GetMapping("/api/voices/me")
    public ApiResult<List<GetVoiceResponse>> getVoices(
            @RequestHeader("X-Authenticated-User") Long userId
    ) {
        return success(getVoiceQuery.getVoicesBy(userId));
    }
}
