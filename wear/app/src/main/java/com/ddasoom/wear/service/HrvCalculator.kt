package com.ddasoom.wear.service

import kotlin.math.sqrt
import kotlin.math.pow

class HrvCalculator {

    /**
     * HRV 지표 계산 함수
     * @param bpmData: 1분 단위로 수집된 BPM 데이터
     * @return FloatArray: 계산된 HRV 지표 (MEAN_RR, MEDIAN_RR, SDRR, RMSSD)
     */
    fun calculateHrvMetrics(bpmData: List<Float>): FloatArray {
        // BPM 데이터를 RR intervals(ms)로 변환
        val rrIntervals = bpmData.map { (60 / it) * 1000 }

        // MEAN_RR 계산
        val meanRR = rrIntervals.average().toFloat()

        // MEDIAN_RR 계산
        val medianRR = if (rrIntervals.size % 2 == 0) {
            val midIndex = rrIntervals.size / 2
            ((rrIntervals[midIndex - 1] + rrIntervals[midIndex]) / 2).toFloat()
        } else {
            rrIntervals[rrIntervals.size / 2].toFloat()
        }

        // SDRR 계산
        val meanValue = rrIntervals.average()
        val sdrr = sqrt(rrIntervals.sumOf { (it - meanValue).pow(2) } / rrIntervals.size).toFloat()

        // RMSSD 계산
        val rmssd = sqrt(rrIntervals.zipWithNext { a, b -> (b - a).pow(2) }.average()).toFloat()

        // 결과를 FloatArray로 반환
        return floatArrayOf(meanRR, medianRR, sdrr, rmssd)
    }
}