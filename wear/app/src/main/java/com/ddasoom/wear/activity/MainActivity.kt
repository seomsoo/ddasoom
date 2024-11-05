package com.ddasoom.wear.activity


import android.app.AlertDialog
import android.Manifest
import android.app.Activity
import android.content.Intent
import android.content.pm.PackageManager
import android.hardware.Sensor
import android.hardware.SensorEvent
import android.hardware.SensorEventListener
import android.hardware.SensorManager
import android.os.Build
import android.os.Bundle
import android.util.Log
import android.view.View
import android.widget.Button
import android.widget.TextView
import android.widget.Toast
import androidx.core.app.ActivityCompat
import androidx.core.content.ContextCompat
import com.ddasoom.wear.R
import com.ddasoom.wear.service.ForegroundService
import com.google.android.gms.wearable.MessageClient
import com.google.android.gms.wearable.Wearable
import org.json.JSONException
import org.json.JSONObject

class MainActivity : Activity(), SensorEventListener {
    private val TAG = "WearHeartRateMonitor"
    private val PERMISSION_REQUEST_CODE = 1
    private val NOTI_PUSH_PATH = "/noti-push"

    private lateinit var sensorManager: SensorManager
    private var heartRateSensor: Sensor? = null
    private lateinit var tv1: TextView
    private lateinit var startButton: Button
    private lateinit var stopButton: Button
    private var isMonitoring = false
    private lateinit var messageClient: MessageClient
    private var nodeId: String? = null

    private val PREFS_NAME = "AppPreferences"
    private val KEY_FIRST_RUN = "isFirstRun"
    private val KEY_PRIVACY_CONSENT = "privacyConsent"

    private val requiredPermissions = if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.S) {
        arrayOf(
            Manifest.permission.BODY_SENSORS,
//            Manifest.permission.WAKE_LOCK,
//            Manifest.permission.FOREGROUND_SERVICE,
//            Manifest.permission.FOREGROUND_SERVICE_DATA_SYNC
        )
    } else {
        arrayOf(
            Manifest.permission.BODY_SENSORS,
            Manifest.permission.WAKE_LOCK,
            Manifest.permission.FOREGROUND_SERVICE
        )
    }

    private fun isFirstRun(): Boolean {
        val preferences = getSharedPreferences(PREFS_NAME, MODE_PRIVATE)
        val isFirstRun = preferences.getBoolean(KEY_FIRST_RUN, true)

        if (isFirstRun) {
            // 첫 실행 표시를 false로 변경
            preferences.edit().putBoolean(KEY_FIRST_RUN, false).apply()
        }

        return isFirstRun
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        // 첫 실행 시 개인정보 처리방침 동의 확인
        if (isFirstRun()) {
            showPrivacyPolicyDialog()
        }

        initializeComponents()
        checkAndRequestPermissions()
        getNodeId()
    }

    private fun savePrivacyPolicyConsent() {
        val preferences = getSharedPreferences(PREFS_NAME, MODE_PRIVATE)
        preferences.edit().putBoolean(KEY_PRIVACY_CONSENT, true).apply()
    }

    private fun showPrivacyPolicyDialog() {
        AlertDialog.Builder(this)
            .setTitle("개인정보 처리방침")
            .setMessage(
                "개인정보 처리방침\n\n" +
                        "1. 수집하는 개인정보 항목\n" +
                        "- 심박수 데이터\n" +
                        "- 기기 정보(모델명)\n\n" +
                        "2. 개인정보의 수집 및 이용목적\n" +
                        "- 심박수 모니터링 서비스 제공\n" +
                        "- 서비스 개선 및 통계\n\n" +
                        "3. 개인정보의 보유 및 이용기간\n" +
                        "- 서비스 제공 기간 동안 보관\n" +
                        "- 사용자 동의 철회 시 즉시 삭제\n\n" +
                        "4. 데이터 전송 및 보안\n" +
                        "- 수집된 데이터는 페어링된 기기로만 전송\n" +
                        "- 모든 데이터는 암호화되어 전송\n" +
                        "- 제3자에게 제공되지 않음"
            )
            .setPositiveButton("동의") { _, _ ->
                savePrivacyPolicyConsent()
                initializeApp()  // 앱 초기화 진행
            }
            .setNegativeButton("거부") { _, _ ->
                finish()  // 앱 종료
            }
            .setCancelable(false)  // 백버튼으로 닫기 방지
            .show()
    }

    private fun initializeApp() {
        // 앱의 메인 기능 초기화
        initializeComponents()
        checkAndRequestPermissions()
        getNodeId()
    }

    private fun initializeComponents() {
        // SensorManager 초기화
        sensorManager = getSystemService(SENSOR_SERVICE) as SensorManager
        heartRateSensor = sensorManager.getDefaultSensor(Sensor.TYPE_HEART_RATE)

        // MessageClient 초기화
        messageClient = Wearable.getMessageClient(this)

        // 센서 존재 여부 확인
        if (heartRateSensor == null) {
            Log.d(TAG, "심박수 센서를 찾을 수 없습니다.")
            Toast.makeText(this, "이 기기에는 심박수 센서가 없습니다.", Toast.LENGTH_LONG).show()
            finish()
            return
        }

        // UI 초기화
        initializeUI()
    }

    private fun clearUserData() {
        // 사용자 데이터 삭제 로직
        // 예: 캐시 삭제, 저장된 설정 삭제 등
        getSharedPreferences(PREFS_NAME, MODE_PRIVATE)
            .edit()
            .clear()
            .apply()
    }

    private fun initializeUI() {
        tv1 = findViewById(R.id.tv1)
        startButton = findViewById(R.id.btn1)
        stopButton = findViewById(R.id.btn2)

        startButton.visibility = View.VISIBLE
        stopButton.visibility = View.GONE

        startButton.setOnClickListener {
            if (!isMonitoring && checkPermissions()) {
                startHeartRateMonitoring()
            } else if (!checkPermissions()) {
                checkAndRequestPermissions()
            }
        }

        stopButton.setOnClickListener {
            stopHeartRateMonitoring()
        }
    }

    private fun checkPermissions(): Boolean {
        return requiredPermissions.all {
            ContextCompat.checkSelfPermission(this, it) == PackageManager.PERMISSION_GRANTED
        }
    }

    private fun checkAndRequestPermissions() {
        val permissionsToRequest = requiredPermissions.filter {
            ContextCompat.checkSelfPermission(this, it) != PackageManager.PERMISSION_GRANTED
        }

        if (permissionsToRequest.isNotEmpty()) {
            ActivityCompat.requestPermissions(
                this,
                permissionsToRequest.toTypedArray(),
                PERMISSION_REQUEST_CODE
            )
        }
    }

    override fun onRequestPermissionsResult(
        requestCode: Int,
        permissions: Array<String>,
        grantResults: IntArray
    ) {
        super.onRequestPermissionsResult(requestCode, permissions, grantResults)

        if (requestCode == PERMISSION_REQUEST_CODE) {
            if (grantResults.isNotEmpty() && grantResults.all { it == PackageManager.PERMISSION_GRANTED }) {
                // 모든 권한이 승인됨
                startHeartRateMonitoring()
            } else {
                // 일부 권한이 거부됨
                Toast.makeText(this, "필요한 권한이 거부되었습니다.", Toast.LENGTH_SHORT).show()
            }
        }
    }

    private fun startHeartRateMonitoring() {
        try {
            if (checkPermissions()) {
                isMonitoring = true
                // 포그라운드 서비스 시작
                val serviceIntent = Intent(this, ForegroundService::class.java).apply {
                    action = ForegroundService.ACTION_START_MONITORING
                }
                if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
                    startForegroundService(serviceIntent)
                } else {
                    startService(serviceIntent)
                }

                startButton.visibility = View.GONE
                stopButton.visibility = View.VISIBLE
                Log.d(TAG, "심박수 모니터링 시작")
            } else {
                Log.e(TAG, "심박수 모니터링 시작 실패: 권한 없음")
                Toast.makeText(this, "심박수 모니터링에 필요한 권한이 없습니다.", Toast.LENGTH_SHORT).show()
            }
        } catch (e: Exception) {
            Log.e(TAG, "센서 등록 실패: ${e.message}", e)
            Toast.makeText(this, "센서 등록에 실패했습니다.", Toast.LENGTH_SHORT).show()
            isMonitoring = false
        }
    }

    private fun stopHeartRateMonitoring() {
        try {
            isMonitoring = false
            // 포그라운드 서비스에 중지 명령 전송
            val serviceIntent = Intent(this, ForegroundService::class.java).apply {
                action = ForegroundService.ACTION_STOP_MONITORING
            }
            startService(serviceIntent)

            startButton.visibility = View.VISIBLE
            stopButton.visibility = View.GONE
            tv1.text = "-- BPM"
            Log.d(TAG, "심박수 모니터링 중지")
        } catch (e: Exception) {
            Log.e(TAG, "센서 해제 실패: ${e.message}", e)
        }
    }

    override fun onSensorChanged(event: SensorEvent?) {
        event?.let {
            if (it.sensor.type == Sensor.TYPE_HEART_RATE && isMonitoring) {
                val heartRate = it.values[0].toInt()
                tv1.text = "$heartRate BPM"
                Log.d(TAG, "심박수: $heartRate")

                // 심박수 데이터를 전송합니다
                sendHeartRate(heartRate)
            }
        }
    }

    private fun sendHeartRate(heartRate: Int) {
        if (nodeId != null) {
            val jsonObject = JSONObject()
            try {
                jsonObject.put("message", "$heartRate")
            } catch (e: JSONException) {
                e.printStackTrace()
                Log.e(TAG, "심박수 전송 실패", e)
                return
            }

            val message = jsonObject.toString()
            messageClient.sendMessage(nodeId!!, NOTI_PUSH_PATH, message.toByteArray())
                .addOnSuccessListener {
                    Log.d(TAG, "심박수 데이터 전송 성공: $heartRate")
                }
                .addOnFailureListener { e ->
                    Log.e(TAG, "심박수 데이터 전송 실패: ${e.message}")
                }
        } else {
            Log.e(TAG, "Node ID is null. Message not sent.")
        }
    }

    private fun getNodeId() {
        Wearable.getNodeClient(this).connectedNodes
            .addOnSuccessListener { nodes ->
                if (nodes.isNotEmpty()) {
                    nodeId = nodes[0].id
                    Log.d(TAG, "Connected node ID: $nodeId")
                } else {
                    Log.e(TAG, "No connected nodes found")
                }
            }
            .addOnFailureListener { e ->
                Log.e(TAG, "Failed to get connected nodes", e)
            }
    }

    override fun onAccuracyChanged(sensor: Sensor?, accuracy: Int) {
        Log.d(TAG, "센서 정확도 변경: $accuracy")
    }

    override fun onDestroy() {
        super.onDestroy()
        if (isMonitoring) {
            stopHeartRateMonitoring()
        }
    }
}
