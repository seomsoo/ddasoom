package com.ddasoom.diary_service.diary.adapter.out.panic;

import com.ddasoom.diary_service.diary.application.domain.PanicRecordInfo;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.time.ZoneId;

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

    private BigDecimal latitude;

    private BigDecimal longitude;

    private String address;

    @Column(length = 500)
    private String description;

    public PanicRecordInfo toRecordInfo() {
        return PanicRecordInfo.builder()
                .startDate(this.startDate)
                .duration(this.duration)
                .latitude(this.latitude)
                .longitude(this.longitude)
                .description(this.description)
                .build();
    }

    public PanicJpaEntity(Long userId, int duration, BigDecimal latitude,
            BigDecimal longitude, String address) {
        this.userId = userId;
        this.duration = duration;
        this.latitude = latitude;
        this.longitude = longitude;
        this.address = address;

        LocalDateTime nowSeoul = LocalDateTime.now(ZoneId.of("Asia/Seoul"));
        this.startDate = nowSeoul.minusSeconds(duration);
    }
}
