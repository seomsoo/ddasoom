package com.ddasoom.user_service.user.adapter.in.web;

import com.ddasoom.user_service.common.annotation.WebAdapter;
import com.ddasoom.user_service.user.adapter.in.web.request.LoginRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@WebAdapter
@RestController
@RequiredArgsConstructor
public class LoginController {

    @PostMapping("/api/users/login")
    public void login(@RequestBody LoginRequest request) {

    }
}
