package com.ddasoom.voice_service.voice.application.port.in;

import com.ddasoom.voice_service.voice.adapter.in.web.response.GetVoiceResponse;
import java.util.List;

public interface GetVoiceQuery {

    List<GetVoiceResponse> getVoicesBy(Long userId);

}
