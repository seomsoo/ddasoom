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
import android.os.Handler
import android.os.IBinder
import android.os.Looper
import android.os.PowerManager
import android.util.Log
import androidx.core.app.NotificationCompat
import androidx.localbroadcastmanager.content.LocalBroadcastManager
import com.ddasoom.wear.R
import com.ddasoom.wear.activity.MainActivity
import com.ddasoom.wear.activity.RequestActivity
import com.ddasoom.wear.constants.Constants
import com.ddasoom.wear.util.PytorchModelUtils
import com.google.android.gms.wearable.MessageClient
import com.google.android.gms.wearable.Wearable
import org.json.JSONObject

class ForegroundService : Service(), HeartRateManager.HeartRateListener {

  private lateinit var heartRateManager: HeartRateManager
  private lateinit var messageClient: MessageClient
  private var nodeId: String? = null
  private lateinit var wakeLock: PowerManager.WakeLock

  private val bpmData = ArrayList<Float>() // 1분 단위로 BPM 데이터를 저장
  private val hrvCalculator = HrvCalculator()
  private val handler = Handler(Looper.getMainLooper())

  companion object {
    var heartRateCallback: ((Int) -> Unit)? = null // 심박수 데이터를 전달하는 콜백
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
//    sendHeartRate(heartRate)
    // 심박수 데이터 콜백 호출
    heartRateCallback?.invoke(heartRate)

    // 유효한 심박수만 처리 (0 이상)
    if (heartRate > 0) {
      bpmData.add(heartRate.toFloat())

      // 유효 심박수가 충분히 수집되면 1분 단위로 HRV 지표 계산
      if (bpmData.size >= 30) {
        val hrvMetrics = hrvCalculator.calculateHrvMetrics(bpmData)
        Log.d(Constants.TAG, "HRV Metrics: ${hrvMetrics.joinToString(", ")}")

        // 필요한 작업 수행 (예: 모델 입력 준비)
        processHrvMetrics(hrvMetrics)

        // 데이터 초기화
        bpmData.clear()
      }
    } else {
      // 심박수가 유효하지 않은 경우 로그 출력
      Log.d(Constants.TAG, "Invalid heart rate received: $heartRate (ignored)")
    }
  }

  // 심박수 데이터를 전송하는 메서드 (수정됨)
//  private fun sendHeartRate(heartRate: Int) {
//    nodeId?.let {
//      val jsonObject = JSONObject().apply {
//        put("title", "bpm")
//        put("content", heartRate)
//      }
//      val message = jsonObject.toString().toByteArray()
//
//      messageClient.sendMessage(it, Constants.NOTI_PUSH_PATH, message)
//        .addOnSuccessListener {
//          Log.d(Constants.TAG, "심박수 데이터 전송 성공: $heartRate")
//        }
//        .addOnFailureListener { e ->
//          Log.e(Constants.TAG, "심박수 데이터 전송 실패: ${e.message}")
//        }
//    } ?: run {
//      Log.e(Constants.TAG, "Node ID is null. Message not sent.")
//    }
//  }

  // onDestroy 메서드
  override fun onDestroy() {
    super.onDestroy()
    if (::wakeLock.isInitialized && wakeLock.isHeld) {
      wakeLock.release()
    }
    heartRateManager.stopMonitoring()
    Log.d(Constants.TAG, "Foreground service stopped")
    // 서비스 종료 시 콜백 해제
    heartRateCallback = null
  }

  // HRV 지표를 처리하는 메서드 (수정됨)
  private fun processHrvMetrics(hrvMetrics: FloatArray) {
    // PyTorch 모델 실행
    val result = PytorchModelUtils.runModel(this, hrvMetrics)
    Log.d(Constants.TAG, "PyTorch 모델 결과: ${result.joinToString(", ")}")

    // 모델 출력 값이 0.5 이상인지 확인
    if (result.isNotEmpty() && result[0] >= 0.5f) {
      Log.d(Constants.TAG, "모델 결과가 0.5 이상입니다. EMERGENCY 메시지를 전송합니다.")
//      sendEmergencyMessage(result[0])
      startRequestActivity()
    } else {
      Log.d(Constants.TAG, "모델 결과가 0.5 미만입니다. 아무 작업도 수행하지 않습니다.")
    }
  }

  // EMERGENCY 메시지를 전송하는 메서드 (새로 추가됨)
  private fun sendEmergencyMessage(modelResult: Float) {
    nodeId?.let {
      val jsonObject = JSONObject().apply {
        put("title", "EMERGENCY")
        put("content", modelResult)
      }
      val message = jsonObject.toString().toByteArray()

      messageClient.sendMessage(it, Constants.NOTI_PUSH_PATH, message)
        .addOnSuccessListener {
          Log.d(Constants.TAG, "EMERGENCY 메시지 전송 성공: $modelResult")
        }
        .addOnFailureListener { e ->
          Log.e(Constants.TAG, "EMERGENCY 메시지 전송 실패: ${e.message}")
        }
    } ?: run {
      Log.e(Constants.TAG, "Node ID is null. Emergency message not sent.")
    }
  }

  private fun startRequestActivity() {
    val intent = Intent(this, RequestActivity::class.java).apply {
      flags = Intent.FLAG_ACTIVITY_NEW_TASK // 서비스에서 액티비티를 실행하려면 이 플래그 필요
    }
    startActivity(intent)
    Log.d(Constants.TAG, "RequestActivity를 실행했습니다.")
  }

  override fun onBind(intent: Intent?): IBinder? = null
}
