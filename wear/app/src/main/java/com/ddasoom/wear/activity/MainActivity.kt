package com.ddasoom.wear.activity

import android.Manifest
import android.app.Activity
import android.app.AlertDialog
import android.app.PendingIntent
import android.content.BroadcastReceiver
import android.content.Context
import android.content.Intent
import android.content.IntentFilter
import android.content.pm.PackageManager
import android.os.Build
import android.os.Bundle
import android.util.Log
import android.view.View
import android.widget.Button
import android.widget.TextView
import android.widget.Toast
import androidx.core.app.ActivityCompat
import androidx.localbroadcastmanager.content.LocalBroadcastManager
import com.ddasoom.wear.R
import com.ddasoom.wear.receiver.SleepReceiver
import com.ddasoom.wear.service.ForegroundService
import com.ddasoom.wear.constants.Constants
import com.ddasoom.wear.constants.Constants.TAG
import com.ddasoom.wear.util.PermissionHelper
import com.google.android.gms.location.ActivityRecognition
import com.google.android.gms.location.ActivityRecognitionClient
import com.google.android.gms.location.SleepSegmentRequest
import com.google.android.gms.wearable.Wearable

class MainActivity : Activity() {

    private lateinit var btnGoBreath: Button
    private lateinit var btnGoBpm: Button
    private var isMonitoring = false

    private lateinit var activityRecognitionClient: ActivityRecognitionClient

    // onCreate 메서드
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        if (isFirstRun()) {
            showPrivacyPolicyDialog()
        } else {
            initializeApp()
        }
    }

    override fun onResume() {
        super.onResume()
        // 브로드캐스트 리시버 등록
        LocalBroadcastManager.getInstance(this).registerReceiver(
            heartRateReceiver,
            IntentFilter("HeartRateUpdate")
        )
    }

    override fun onPause() {
        super.onPause()
        // 브로드캐스트 리시버 해제
        LocalBroadcastManager.getInstance(this).unregisterReceiver(heartRateReceiver)
    }

    // 앱 초기화 메서드
    private fun initializeApp() {
        initializeUI()
        checkAndRequestPermissions()
        checkAndRequestActivityRecognitionPermission()
        getNodeId()
        startHeartRateMonitoring() // 앱 실행 시 자동 호출
    }

    // UI 초기화 메서드
    private fun initializeUI() {
        btnGoBreath = findViewById(R.id.btn_go_breath)
        btnGoBpm = findViewById(R.id.btn_go_bpm)

        // 호흡 버튼 클릭 시 SelectActivity로 이동
        btnGoBreath.setOnClickListener {
            val intent = Intent(this, SelectActivity::class.java)
            startActivity(intent)
        }

        // 심박수 버튼 클릭 시 BpmReadyActivity로 이동
        btnGoBpm.setOnClickListener {
            val intent = Intent(this, BpmReadyActivity::class.java)
            startActivity(intent)
        }

//        btnStart.setOnClickListener {
//            if (!isMonitoring && checkPermissions()) {
//                startHeartRateMonitoring()
//            } else if (!checkPermissions()) {
//                checkAndRequestPermissions()
//            }
//        }
//
//        btnStop.setOnClickListener {
//            stopHeartRateMonitoring()
//        }
    }

    // 권한 확인 메서드
    private fun checkPermissions(): Boolean {
        return PermissionHelper.checkPermissions(this, PermissionHelper.getRequiredPermissions())
    }

    // 권한 요청 메서드
    private fun checkAndRequestPermissions() {
        val permissionsToRequest = PermissionHelper.getRequiredPermissions().filter {
            ActivityCompat.checkSelfPermission(this, it) != PackageManager.PERMISSION_GRANTED
        }

        if (permissionsToRequest.isNotEmpty()) {
            ActivityCompat.requestPermissions(
                this,
                permissionsToRequest.toTypedArray(),
                Constants.PERMISSION_REQUEST_CODE
            )
        }
    }

    // Activity Recognition 권한 확인 및 요청 메서드
    private fun checkAndRequestActivityRecognitionPermission() {
        if (ActivityCompat.checkSelfPermission(
                this,
                Manifest.permission.ACTIVITY_RECOGNITION
            ) == PackageManager.PERMISSION_GRANTED
        ) {
            initializeSleepTracking()
        } else {
            ActivityCompat.requestPermissions(
                this,
                arrayOf(Manifest.permission.ACTIVITY_RECOGNITION),
                Constants.PERMISSION_SLEEP_REQUEST_CODE
            )
        }
    }

    // 권한 요청 결과 처리 메서드
    override fun onRequestPermissionsResult(
        requestCode: Int,
        permissions: Array<out String>,
        grantResults: IntArray
    ) {
        when (requestCode) {
            Constants.PERMISSION_REQUEST_CODE -> {
                if (checkPermissions()) {
                    startHeartRateMonitoring()
                } else {
                    Toast.makeText(this, "권한이 필요합니다.", Toast.LENGTH_SHORT).show()
                }
            }

            Constants.PERMISSION_SLEEP_REQUEST_CODE -> {
                if ((grantResults.isNotEmpty() && grantResults[0] == PackageManager.PERMISSION_GRANTED)) {
                    initializeSleepTracking()
                } else {
                    Toast.makeText(this, "수면 추적 권한이 필요합니다.", Toast.LENGTH_SHORT).show()
                }
            }
        }
    }

    // 수면 추적 초기화 메서드
    private fun initializeSleepTracking() {
        try {
            activityRecognitionClient = ActivityRecognition.getClient(this)

            val flag = if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.S) {
                PendingIntent.FLAG_UPDATE_CURRENT or PendingIntent.FLAG_MUTABLE
            } else {
                PendingIntent.FLAG_UPDATE_CURRENT
            }

            val sleepIntent = PendingIntent.getBroadcast(
                this,
                0,
                Intent(this, SleepReceiver::class.java),
                flag
            )

            val sleepSegmentRequest = SleepSegmentRequest.getDefaultSleepSegmentRequest()

            activityRecognitionClient.requestSleepSegmentUpdates(sleepIntent, sleepSegmentRequest)
                .addOnSuccessListener { Log.d(Constants.TAG, "Sleep tracking started") }
                .addOnFailureListener { e ->
                    Log.e(
                        Constants.TAG,
                        "Failed to start sleep tracking",
                        e
                    )
                }

        } catch (e: SecurityException) {
            Log.e(Constants.TAG, "권한이 없어 Sleep API를 시작할 수 없습니다.", e)
        }
    }

    private val heartRateReceiver = object : BroadcastReceiver() {
        override fun onReceive(context: Context?, intent: Intent?) {
            val heartRate = intent?.getIntExtra("heartRate", -1) ?: -1
            if (heartRate != -1) {
                Log.d("HeartRate", "Current heart rate: $heartRate BPM")
            }
        }
    }

    // 심박수 모니터링 시작 메서드
    private fun startHeartRateMonitoring() {
        if (isMonitoring) return // 이미 실행 중인 경우 중복 실행 방지
        isMonitoring = true
        val serviceIntent = Intent(this, ForegroundService::class.java).apply {
            action = ForegroundService.ACTION_START_MONITORING
        }
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            startForegroundService(serviceIntent)
        } else {
            startService(serviceIntent)
        }
        Log.d(Constants.TAG, "Heart rate monitoring started.")
    }

    // 심박수 모니터링 중지 메서드
    private fun stopHeartRateMonitoring() {
        isMonitoring = false
        val serviceIntent = Intent(this, ForegroundService::class.java).apply {
            action = ForegroundService.ACTION_STOP_MONITORING
        }
        startService(serviceIntent)
        Log.d(Constants.TAG, "Heart rate monitoring stopped.")
    }

    // 노드 ID를 가져오는 메서드
    private fun getNodeId() {
        Wearable.getNodeClient(this).connectedNodes
            .addOnSuccessListener { nodes ->
                if (nodes.isNotEmpty()) {
                    var nodeId = nodes[0].id
                    Log.d(TAG, "Connected node ID: $nodeId")
                } else {
                    Log.e(TAG, "No connected nodes found")
                }
            }
            .addOnFailureListener { e ->
                Log.e(TAG, "Failed to get connected nodes", e)
            }
    }

    // 최초 실행 여부를 확인하는 메서드
    private fun isFirstRun(): Boolean {
        val preferences = getSharedPreferences(Constants.PREFS_NAME, MODE_PRIVATE)
        val isFirstRun = preferences.getBoolean(Constants.KEY_FIRST_RUN, true)

        if (isFirstRun) {
            preferences.edit().putBoolean(Constants.KEY_FIRST_RUN, false).apply()
        }
        return isFirstRun
    }

    // 개인정보 처리방침 동의 여부를 저장하는 메서드
    private fun savePrivacyPolicyConsent() {
        val preferences = getSharedPreferences(Constants.PREFS_NAME, MODE_PRIVATE)
        preferences.edit().putBoolean(Constants.KEY_PRIVACY_CONSENT, true).apply()
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
                initializeApp()
            }
            .setNegativeButton("거부") { _, _ ->
                finish()
            }
            .setCancelable(false)
            .show()
    }

    // onDestroy 메서드
    override fun onDestroy() {
        super.onDestroy()
        if (isMonitoring) {
            stopHeartRateMonitoring()
        }
    }
}