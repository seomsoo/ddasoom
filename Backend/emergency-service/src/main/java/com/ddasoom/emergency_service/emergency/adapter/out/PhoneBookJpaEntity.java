package com.ddasoom.emergency_service.emergency.adapter.out;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "phone_books")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class PhoneBookJpaEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "phone_book_id")
    private Long id;

    private Long userId;

    private String phoneNumber;

    private String alias;

    public PhoneBookJpaEntity(Long userId, String phoneNumber, String alias) {
        this.userId = userId;
        this.phoneNumber = phoneNumber;
        this.alias = alias;
    }
}
