package com.ddasoom.diary_service.diary.adapter.out.selfDiagnosis;

import com.ddasoom.diary_service.diary.application.domain.GetSelfDiagnosisDto;
import com.ddasoom.diary_service.diary.application.domain.QGetSelfDiagnosisDto;
import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class SelfDiagnosisQueryRepository {

    private final JPAQueryFactory jpaQueryFactory;

    public GetSelfDiagnosisDto getSelfDiagnosis(Long userId, int year, int month) {
        QSelfDiagnosisJpaEntity selfDiagnosis = QSelfDiagnosisJpaEntity.selfDiagnosisJpaEntity;
        return jpaQueryFactory
                .select(new QGetSelfDiagnosisDto(
                        selfDiagnosis.count().intValue(),
                        Expressions.cases().when(selfDiagnosis.panicDoubtCount.goe(4)).then(1).otherwise(0)
                                .sum()
                ))
                .from(selfDiagnosis)
                .where(selfDiagnosis.userId.eq(userId)
                        .and(selfDiagnosis.date.year().eq(year))
                        .and(selfDiagnosis.date.month().eq(month))
                ).fetchOne();
    }
}
