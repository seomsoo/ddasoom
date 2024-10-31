package com.ddasoom.user_service.user.application.port.in;

import com.ddasoom.user_service.user.adapter.in.web.response.GetUserInfoResponse;

public interface GetUserInfoQuery {

    GetUserInfoResponse getUserInfo(Long userId);
}
