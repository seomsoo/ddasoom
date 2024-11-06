// package com.ddasoom.wear.service

package com.ddasoom.wear.service

import android.app.Notification
import android.app.NotificationChannel
import android.app.NotificationManager
import android.app.PendingIntent
import android.app.Service
import android.content.Intent
import android.hardware.Sensor
import android.hardware.SensorEvent
import android.os.Build
import android.os.IBinder
import android.os.PowerManager
import android.util.Log
import androidx.core.app.NotificationCompat
import androidx.localbroadcastmanager.content.LocalBroadcastManager
import com.ddasoom.wear.R
import com.ddasoom.wear.activity.MainActivity
import com.ddasoom.wear.constants.Constants
import com.google.android.gms.wearable.MessageClient
import com.google.android.gms.wearable.Wearable
import org.json.JSONObject

class ForegroundService : Service(), HeartRateManager.HeartRateListener {

  private lateinit var heartRateManager: HeartRateManager
  private lateinit var messageClient: MessageClient
  private var nodeId: String? = null
  private lateinit var wakeLock: PowerManager.WakeLock

  companion object {
    const val ACTION_START_MONITORING = "action.START_MONITORING"
    const val ACTION_STOP_MONITORING = "action.STOP_MONITORING"
  }

  // onCreate 메서드
  override fun onCreate() {
    super.onCreate()
    initializeWakeLock()
    createNotificationChannel()
    startForeground(1, createNotification())

    heartRateManager = HeartRateManager(this, this)
    messageClient = Wearable.getMessageClient(this)
    getNodeId()
  }

  // WakeLock 초기화 메서드
  private fun initializeWakeLock() {
    val powerManager = getSystemService(POWER_SERVICE) as PowerManager
    wakeLock = powerManager.newWakeLock(
      PowerManager.PARTIAL_WAKE_LOCK,
      "HeartRateMonitor::WakeLockTag"
    )
    wakeLock.acquire()
  }

  // NotificationChannel 생성 메서드
  private fun createNotificationChannel() {
    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
      val serviceChannel = NotificationChannel(
        Constants.CHANNEL_ID,
        "Heart Rate Monitor Channel",
        NotificationManager.IMPORTANCE_LOW
      )
      val manager = getSystemService(NotificationManager::class.java)
      manager.createNotificationChannel(serviceChannel)
    }
  }

  // Notification 생성 메서드
  private fun createNotification(): Notification {
    val intent = Intent(this, MainActivity::class.java)
    val pendingIntent = PendingIntent.getActivity(
      this, 0, intent, PendingIntent.FLAG_IMMUTABLE
    )

    return NotificationCompat.Builder(this, Constants.CHANNEL_ID)
      .setContentTitle("심박수 모니터링 중")
      .setContentText("백그라운드에서 심박수를 모니터링하고 있습니다")
      .setSmallIcon(R.drawable.ddasomi_24)
      .setContentIntent(pendingIntent)
      .setOngoing(true)
      .build()
  }

  // 노드 ID를 가져오는 메서드
  private fun getNodeId() {
    Wearable.getNodeClient(this).connectedNodes
      .addOnSuccessListener { nodes ->
        if (nodes.isNotEmpty()) {
          nodeId = nodes[0].id
          Log.d(Constants.TAG, "Connected node ID: $nodeId")
        } else {
          Log.e(Constants.TAG, "No connected nodes found")
        }
      }
      .addOnFailureListener { e ->
        Log.e(Constants.TAG, "Failed to get connected nodes", e)
      }
  }

  // onStartCommand 메서드
  override fun onStartCommand(intent: Intent?, flags: Int, startId: Int): Int {
    when (intent?.action) {
      ACTION_START_MONITORING -> {
        heartRateManager.startMonitoring()
      }
      ACTION_STOP_MONITORING -> {
        heartRateManager.stopMonitoring()
        stopSelf()
      }
    }
    return START_STICKY
  }

  // 심박수 변경 시 호출되는 메서드
  override fun onHeartRateChanged(heartRate: Int) {
    sendHeartRate(heartRate)
  }

  // 심박수 데이터를 전송하는 메서드
  private fun sendHeartRate(heartRate: Int) {
    nodeId?.let {
      val jsonObject = JSONObject().apply {
        put("message", heartRate.toString())
      }
      val message = jsonObject.toString().toByteArray()

      messageClient.sendMessage(it, Constants.NOTI_PUSH_PATH, message)
        .addOnSuccessListener {
          Log.d(Constants.TAG, "심박수 데이터 전송 성공: $heartRate")
        }
        .addOnFailureListener { e ->
          Log.e(Constants.TAG, "심박수 데이터 전송 실패: ${e.message}")
        }
    } ?: run {
      Log.e(Constants.TAG, "Node ID is null. Message not sent.")
    }
  }

  fun onSensorChanged(event: SensorEvent?) {
    event?.let {
      if (it.sensor.type == Sensor.TYPE_HEART_RATE) {
        val heartRate = it.values[0].toInt()
        Log.d(Constants.TAG, "Heart rate: $heartRate")
        sendHeartRate(heartRate)

        // 심박수 데이터를 로컬 브로드캐스트로 전송
        val intent = Intent("HeartRateUpdate")
        intent.putExtra("heartRate", heartRate)
        LocalBroadcastManager.getInstance(this).sendBroadcast(intent)
      }
    }
  }

  // onDestroy 메서드
  override fun onDestroy() {
    super.onDestroy()
    if (::wakeLock.isInitialized && wakeLock.isHeld) {
      wakeLock.release()
    }
    heartRateManager.stopMonitoring()
    Log.d(Constants.TAG, "Foreground service stopped")
  }

  override fun onBind(intent: Intent?): IBinder? = null
}
