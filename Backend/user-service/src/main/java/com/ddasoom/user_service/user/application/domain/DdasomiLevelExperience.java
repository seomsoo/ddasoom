package com.ddasoom.user_service.user.application.domain;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public enum DdasomiLevelExperience {

    LEVEL_ONE(1, 100),
    LEVEL_TWO(2, 300),
    LEVEL_THREE(3, 500),
    LEVEL_FOUR(4, 99999);

    private final int level;
    private final int maxExperience;

    public static int getNowLevel(int experience) {
        if (experience < LEVEL_ONE.maxExperience) {
            return LEVEL_ONE.level;
        }
        if (experience < LEVEL_TWO.maxExperience) {
            return LEVEL_TWO.level;
        }
        if (experience < LEVEL_THREE.maxExperience) {
            return LEVEL_THREE.level;
        }
        return LEVEL_FOUR.level;
    }

    public static double getNowPercent(int experience) {
        double percent;
        if (experience < LEVEL_ONE.maxExperience) {
            percent = (double) experience / LEVEL_ONE.maxExperience * 100;
        } else if (experience < LEVEL_TWO.maxExperience) {
            int previousMax = LEVEL_ONE.maxExperience;
            percent = (double) (experience - previousMax) / (LEVEL_TWO.maxExperience - previousMax) * 100;
        } else if (experience < LEVEL_THREE.maxExperience) {
            int previousMax = LEVEL_TWO.maxExperience;
            percent = (double) (experience - previousMax) / (LEVEL_THREE.maxExperience - previousMax) * 100;
        } else {
            percent = 100.0;
        }

        return Math.round(percent * 10) / 10.0;
    }
}
