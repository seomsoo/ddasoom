package com.ddasoom.diary_service.diary.adapter.out.users;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface UserRepository extends JpaRepository<UserJpaEntity, Long> {

    @Query("SELECT u.id FROM UserJpaEntity u")
    List<Long> findAllUserId();
}
