package com.ddasoom.wear.activity

import android.os.Bundle
import android.util.Log
import android.widget.Button
import android.widget.TextView
import androidx.appcompat.app.AppCompatActivity
import com.ddasoom.wear.R
import com.ddasoom.wear.constants.Constants
import com.ddasoom.wear.service.ForegroundService
import com.google.android.gms.wearable.MessageClient
import com.google.android.gms.wearable.Wearable
import org.json.JSONObject

class BpmMeasureActivity : AppCompatActivity() {

    private lateinit var heartRateValueText: TextView
    private lateinit var emergencyButton: Button

    private lateinit var messageClient: MessageClient
    private var nodeId: String? = null

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_bpm_measure)

        // 심박수 텍스트뷰 연결
        heartRateValueText = findViewById(R.id.text_heart_rate_value)
        // 긴급 버튼 연결
        emergencyButton = findViewById(R.id.button_emergency)

        // ForegroundService의 콜백 등록
        ForegroundService.heartRateCallback = { heartRate ->
            runOnUiThread {
                heartRateValueText.text = heartRate.toString()
            }
        }

        // MessageClient 초기화 및 노드 ID 가져오기
        messageClient = Wearable.getMessageClient(this)
        getNodeId()

        // 긴급 버튼 클릭 이벤트 처리
        emergencyButton.setOnClickListener {
            sendEmergencyMessage(0.0f) // 모델 결과값이 없다면 0.0f로 전달
        }
    }

    override fun onDestroy() {
        super.onDestroy()
        // Activity 종료 시 콜백 해제
        ForegroundService.heartRateCallback = null
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

    // EMERGENCY 메시지를 전송하는 메서드
    private fun sendEmergencyMessage(modelResult: Float) {
        nodeId?.let {
            val jsonObject = JSONObject().apply {
                put("title", "EMERGENCY")
                put("content", "EMERGENCY")
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
}
