import numpy as np


def calculate_hrv_metrics(bpm_data):
    rr_intervals = (60 / np.array(bpm_data)) * 1000

    mean_rr = np.mean(rr_intervals)

    median_rr = np.median(rr_intervals)

    sddrr = np.std(rr_intervals)

    rmssd = np.sqrt(np.mean(np.diff(rr_intervals) ** 2))

    return {
        "MEAN_RR": mean_rr,
        "MEDIAN_RR": median_rr,
        "SDRR": sddrr,
        "RMSSD": rmssd
    }
