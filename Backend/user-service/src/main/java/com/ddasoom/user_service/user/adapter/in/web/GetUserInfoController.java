package com.ddasoom.user_service.user.adapter.in.web;

import static com.ddasoom.user_service.common.util.ApiUtils.success;

import com.ddasoom.user_service.common.annotation.WebAdapter;
import com.ddasoom.user_service.common.util.ApiUtils.ApiResult;
import com.ddasoom.user_service.user.adapter.in.web.response.GetUserInfoResponse;
import com.ddasoom.user_service.user.application.port.in.GetUserInfoQuery;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@WebAdapter
@RestController
@RequiredArgsConstructor
public class GetUserInfoController {

    private final GetUserInfoQuery getUserInfoQuery;

    @GetMapping("/api/users/{userId}")
    public ApiResult<GetUserInfoResponse> getUserInfo(@PathVariable Long userId) {
        return success(getUserInfoQuery.getUserInfo(userId));
    }
}
