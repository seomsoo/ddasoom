package com.ddasoom.diary_service.diary.adapter.out.panic;

import com.ddasoom.diary_service.diary.application.domain.PanicRecordInfo;
import com.ddasoom.diary_service.diary.application.domain.PanicReportInfo;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import java.math.BigDecimal;
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

    @Column(precision = 10, scale = 6)
    private BigDecimal latitude;

    @Column(precision = 10, scale = 6)
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
                .address(this.address)
                .description(this.description)
                .build();
    }

    public PanicReportInfo toReportInfo() {
        return new PanicReportInfo(this.startDate, this.duration);
    }

    public PanicJpaEntity(Long userId, LocalDateTime startDate, int duration,
            BigDecimal latitude, BigDecimal longitude, String address, String description) {
        this.userId = userId;
        this.startDate = startDate;
        this.duration = duration;
        this.latitude = latitude;
        this.longitude = longitude;
        this.address = address;
        this.description = description;
    }

    public void saveDescription(String description) {
        this.description = description;
    }
}
