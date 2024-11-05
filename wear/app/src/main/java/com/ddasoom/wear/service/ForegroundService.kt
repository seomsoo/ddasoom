package com.ddasoom.wear.service

import android.Manifest
import android.app.Notification
import android.app.NotificationChannel
import android.app.NotificationManager
import android.app.PendingIntent
import android.app.Service
import android.content.Context
import android.content.Intent
import android.content.pm.PackageManager
import android.hardware.Sensor
import android.hardware.SensorEvent
import android.hardware.SensorEventListener
import android.hardware.SensorManager
import android.os.Build
import android.os.Handler
import android.os.IBinder
import android.os.Looper
import android.os.PowerManager
import android.util.Log
import androidx.core.app.NotificationCompat
import androidx.core.content.ContextCompat
import com.ddasoom.wear.R
import com.ddasoom.wear.activity.MainActivity
import com.google.android.gms.wearable.MessageClient
import com.google.android.gms.wearable.Wearable
import org.json.JSONObject

class ForegroundService : Service(), SensorEventListener {
  private val TAG = "WearHeartRateMonitorService"
  private val CHANNEL_ID = "HeartRateMonitorChannel"
  private val NOTI_PUSH_PATH = "/noti-push"

  private lateinit var sensorManager: SensorManager
  private var heartRateSensor: Sensor? = null
  private lateinit var messageClient: MessageClient
  private var nodeId: String? = null
  private lateinit var wakeLock: PowerManager.WakeLock

  private fun checkPermissions(): Boolean {
    return ContextCompat.checkSelfPermission(
      this,
      Manifest.permission.BODY_SENSORS
    ) == PackageManager.PERMISSION_GRANTED
  }

  companion object {
    private const val TAG = "WearHeartRateMonitorService"
    const val ACTION_START_MONITORING = "action.START_MONITORING"
    const val ACTION_STOP_MONITORING = "action.STOP_MONITORING"
  }

  private var isMonitoring = false

  override fun onCreate() {
    super.onCreate()
    if (!checkPermissions()) {
      Log.e(TAG, "Body sensors 권한이 없습니다.")
      stopSelf()
      return
    }

    initializeWakeLock()
    createNotificationChannel()
    startForeground(1, createNotification())

    // 센서 매니저 및 메시지 클라이언트 초기화
    sensorManager = getSystemService(SENSOR_SERVICE) as SensorManager
    heartRateSensor = sensorManager.getDefaultSensor(Sensor.TYPE_HEART_RATE)
    messageClient = Wearable.getMessageClient(this)

    // Node ID 가져오기
    getNodeId()

    // 센서가 있는 경우 모니터링 시작
    if (heartRateSensor != null) {
      sensorManager.registerListener(this, heartRateSensor, SensorManager.SENSOR_DELAY_NORMAL)
    } else {
      Log.e(TAG, "심박수 센서를 찾을 수 없습니다.")
      stopSelf()
    }
  }

  private fun initializeWakeLock() {
    val powerManager = getSystemService(Context.POWER_SERVICE) as PowerManager
    wakeLock = powerManager.newWakeLock(
      PowerManager.PARTIAL_WAKE_LOCK,
      "HeartRateMonitor::WakeLockTag"
    )
    wakeLock.acquire()
  }

  private fun createNotificationChannel() {
    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
      val serviceChannel = NotificationChannel(
        CHANNEL_ID,
        "Heart Rate Monitor Channel",
        NotificationManager.IMPORTANCE_LOW
      ).apply {
        setShowBadge(false)
        enableLights(false)
        enableVibration(false)
      }

      val manager = getSystemService(NotificationManager::class.java)
      manager.createNotificationChannel(serviceChannel)
    }
  }

  private fun createNotification(): Notification {
    // 알림을 탭했을 때 MainActivity로 돌아가도록 PendingIntent 생성
    val intent = Intent(this, MainActivity::class.java)
    val pendingIntent = PendingIntent.getActivity(
      this, 0, intent,
      PendingIntent.FLAG_IMMUTABLE
    )

    return NotificationCompat.Builder(this, CHANNEL_ID)
      .setContentTitle("심박수 모니터링 중")
      .setContentText("백그라운드에서 심박수를 모니터링하고 있습니다")
      .setSmallIcon(R.drawable.ddasomi_24)
      .setContentIntent(pendingIntent)
      .setOngoing(true)
      .build()
  }

  private fun getNodeId() {
    Wearable.getNodeClient(this).connectedNodes
      .addOnSuccessListener { nodes ->
        if (nodes.isNotEmpty()) {
          nodeId = nodes[0].id
          Log.d(TAG, "Connected node ID: $nodeId")
        } else {
          Log.e(TAG, "No connected nodes found")
          // 재시도 로직 추가
          Handler(Looper.getMainLooper()).postDelayed({
            getNodeId()
          }, 5000) // 5초 후 재시도
        }
      }
      .addOnFailureListener { e ->
        Log.e(TAG, "Failed to get connected nodes", e)
        // 재시도 로직 추가
        Handler(Looper.getMainLooper()).postDelayed({
          getNodeId()
        }, 5000) // 5초 후 재시도
      }
  }

  override fun onStartCommand(intent: Intent?, flags: Int, startId: Int): Int {
    when (intent?.action) {
      ACTION_START_MONITORING -> {
        isMonitoring = true
        startHeartRateMonitoring()
      }
      ACTION_STOP_MONITORING -> {
        isMonitoring = false
        stopHeartRateMonitoring()
      }
    }
    return START_STICKY
  }

  override fun onSensorChanged(event: SensorEvent?) {
    event?.let {
      if (it.sensor.type == Sensor.TYPE_HEART_RATE) {
        val heartRate = it.values[0].toInt()
        Log.d(TAG, "Heart rate: $heartRate")
        sendHeartRate(heartRate)
      }
    }
  }

  private fun sendHeartRate(heartRate: Int) {
    if (nodeId == null) {
      getNodeId() // nodeId가 없으면 다시 시도
      return
    }

    nodeId?.let {
      val jsonObject = JSONObject().apply {
        put("message", heartRate.toString())
      }
      val message = jsonObject.toString().toByteArray()

      messageClient.sendMessage(it, NOTI_PUSH_PATH, message)
        .addOnSuccessListener {
          Log.d(TAG, "심박수 데이터 전송 성공: $heartRate")
        }
        .addOnFailureListener { e ->
          Log.e(TAG, "심박수 데이터 전송 실패: ${e.message}")
          // 전송 실패시 재시도 로직 추가
          Handler(Looper.getMainLooper()).postDelayed({
            sendHeartRate(heartRate)
          }, 1000) // 1초 후 재시도
        }
    }
  }

  private fun startHeartRateMonitoring() {
    if (heartRateSensor != null) {
      sensorManager.registerListener(this, heartRateSensor, SensorManager.SENSOR_DELAY_NORMAL)
      Log.d(TAG, "심박수 모니터링 시작")
    }
  }

  private fun stopHeartRateMonitoring() {
    sensorManager.unregisterListener(this)
    Log.d(TAG, "심박수 모니터링 중지")
  }

  override fun onAccuracyChanged(sensor: Sensor?, accuracy: Int) {
    Log.d(TAG, "Sensor accuracy changed: $accuracy")
  }

  override fun onDestroy() {
    super.onDestroy()
    if (::wakeLock.isInitialized && wakeLock.isHeld) {
      wakeLock.release()
    }
    sensorManager.unregisterListener(this)
    Log.d(TAG, "Foreground service stopped")
  }

  override fun onBind(intent: Intent?): IBinder? = null


}
