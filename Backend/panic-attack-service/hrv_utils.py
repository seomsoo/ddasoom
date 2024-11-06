import numpy as np

def calculate_hrv_metrics(bpm_data):
    # bpm 데이터를 이용하여 RR 간격 계산 (초 단위로 변환)
    rr_intervals = (60 / np.array(bpm_data)) * 1000  # bpm -> seconds per beat (RR 간격)

    # MEAN_RR: RR 간격의 평균
    mean_rr = np.mean(rr_intervals)

    # MEDIAN_RR: RR 간격의 중앙값
    median_rr = np.median(rr_intervals)

    # SDRR: RR 간격의 표준편차
    sddrr = np.std(rr_intervals)

    # RMSSD: RR 간격의 제곱 차이의 평균의 제곱근
    rmssd = np.sqrt(np.mean(np.diff(rr_intervals)**2))

    return {
        "MEAN_RR": mean_rr,
        "MEDIAN_RR": median_rr,
        "SDRR": sddrr,
        "RMSSD": rmssd
    }