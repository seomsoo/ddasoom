package com.ddasoom.diary_service.diary.application.port.in;

public record PanicDescriptionCommand(
        Long panicId,
        String description
) {

}
