package com.ddasoom.diary_service.diary.adapter.out.panic;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import java.time.LocalDateTime;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "panic_record")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class PanicJpaEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "panic_record_id")
    private Long id;

    private Long userId;

    private LocalDateTime startDate;

    private int duration;

    private double latitude;

    private double longitude;

    @Column(length = 500)
    private String description;
}
