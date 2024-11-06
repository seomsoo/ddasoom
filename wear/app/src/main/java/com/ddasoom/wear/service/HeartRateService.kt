package com.ddasoom.wear.service

import android.content.Context
import android.hardware.Sensor
import android.hardware.SensorEvent
import android.hardware.SensorEventListener
import android.hardware.SensorManager
import android.util.Log
import com.ddasoom.wear.constants.Constants

class HeartRateManager(
  private val context: Context,
  private val listener: HeartRateListener
) : SensorEventListener {

  private val sensorManager: SensorManager =
    context.getSystemService(Context.SENSOR_SERVICE) as SensorManager
  private var heartRateSensor: Sensor? = null

  init {
    heartRateSensor = sensorManager.getDefaultSensor(Sensor.TYPE_HEART_RATE)
  }

  // 심박수 모니터링을 시작하는 메서드
  fun startMonitoring() {
    heartRateSensor?.let {
      sensorManager.registerListener(this, it, SensorManager.SENSOR_DELAY_NORMAL)
      Log.d(Constants.TAG, "심박수 모니터링 시작")
    } ?: run {
      Log.e(Constants.TAG, "심박수 센서를 찾을 수 없습니다.")
    }
  }

  // 심박수 모니터링을 중지하는 메서드
  fun stopMonitoring() {
    sensorManager.unregisterListener(this)
    Log.d(Constants.TAG, "심박수 모니터링 중지")
  }

  override fun onSensorChanged(event: SensorEvent?) {
    event?.let {
      if (it.sensor.type == Sensor.TYPE_HEART_RATE) {
        val heartRate = it.values[0].toInt()
        Log.d(Constants.TAG, "심박수: $heartRate")
        listener.onHeartRateChanged(heartRate)
      }
    }
  }

  override fun onAccuracyChanged(sensor: Sensor?, accuracy: Int) {
    Log.d(Constants.TAG, "센서 정확도 변경: $accuracy")
  }

  interface HeartRateListener {
    fun onHeartRateChanged(heartRate: Int)
  }
}
