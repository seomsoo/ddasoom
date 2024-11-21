package com.ddasoom.wear.activity

import android.os.Bundle
import android.util.Log
import android.widget.Button
import android.widget.TextView
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import com.ddasoom.wear.R
import com.ddasoom.wear.constants.Constants
import com.google.android.gms.wearable.MessageClient
import com.google.android.gms.wearable.Wearable
import org.json.JSONObject

class EmergencyActivity : AppCompatActivity() {

    private lateinit var endText1: TextView
    private lateinit var endText2: TextView
    private lateinit var endText3: TextView
    private lateinit var confirmBreathButton: Button
    private lateinit var confirmRejectButton: Button

    private lateinit var messageClient: MessageClient
    private var nodeId: String? = null

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_emergency) // XML 파일 연결

        // UI 요소 초기화
        endText1 = findViewById(R.id.end_text_1)
        endText2 = findViewById(R.id.end_text_2)
        endText3 = findViewById(R.id.end_text_3)
        confirmBreathButton = findViewById(R.id.btn_confirm_breath)
        confirmRejectButton = findViewById(R.id.btn_reject_breath)

        // MessageClient 초기화 및 노드 ID 가져오기
        messageClient = Wearable.getMessageClient(this)
        getNodeId()

        // "네" 버튼 클릭 이벤트 처리
        confirmBreathButton.setOnClickListener {
            sendEmergencyMessage(0.0f) // 모델 결과값을 전달 (현재는 0.0f)
            Toast.makeText(this, "스마트폰으로 알림이 전송됐습니다.", Toast.LENGTH_LONG).show()
            finish()
        }

        // "아니오" 버튼 클릭 이벤트 처리
        confirmRejectButton.setOnClickListener {
            finish()
        }
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
