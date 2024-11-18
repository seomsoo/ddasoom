package com.ddasoom.wear.activity

import android.animation.Animator
import android.animation.AnimatorSet
import android.animation.ObjectAnimator
import android.os.Bundle
import android.util.Log
import android.widget.Button
import android.widget.ImageView
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
    private lateinit var heartImageView: ImageView

    private lateinit var messageClient: MessageClient
    private var nodeId: String? = null

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_bpm_measure)

        // UI 요소 연결
        heartRateValueText = findViewById(R.id.text_heart_rate_value)
        emergencyButton = findViewById(R.id.button_emergency)
        heartImageView = findViewById(R.id.image_request_heart)

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

        // 하트 애니메이션 시작
        startHeartBeatAnimation()
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

    // 하트 애니메이션 메서드
    private fun startHeartBeatAnimation() {
        // 첫 번째 확대 애니메이션
        val scaleUpX1 = ObjectAnimator.ofFloat(heartImageView, "scaleX", 1.0f, 1.15f) // 1.15배로 확대
        val scaleUpY1 = ObjectAnimator.ofFloat(heartImageView, "scaleY", 1.0f, 1.15f)
        scaleUpX1.duration = 350 // 기존 500ms에서 줄임
        scaleUpY1.duration = 350

        // 첫 번째 축소 애니메이션
        val scaleDownX1 = ObjectAnimator.ofFloat(heartImageView, "scaleX", 1.15f, 0.95f) // 약간 작게 축소
        val scaleDownY1 = ObjectAnimator.ofFloat(heartImageView, "scaleY", 1.15f, 0.95f)
        scaleDownX1.duration = 350 // 기존 500ms에서 줄임
        scaleDownY1.duration = 350

        // 두 번째 확대 애니메이션
        val scaleUpX2 = ObjectAnimator.ofFloat(heartImageView, "scaleX", 0.95f, 1.1f) // 1.1배로 작게 확대
        val scaleUpY2 = ObjectAnimator.ofFloat(heartImageView, "scaleY", 0.95f, 1.1f)
        scaleUpX2.duration = 300 // 기존 400ms에서 줄임
        scaleUpY2.duration = 300

        // 두 번째 축소 애니메이션
        val scaleDownX2 = ObjectAnimator.ofFloat(heartImageView, "scaleX", 1.1f, 1.0f) // 원래 크기로 돌아옴
        val scaleDownY2 = ObjectAnimator.ofFloat(heartImageView, "scaleY", 1.1f, 1.0f)
        scaleDownX2.duration = 300 // 기존 400ms에서 줄임
        scaleDownY2.duration = 300

        // 쉬는 시간 추가
        val pause = ObjectAnimator.ofFloat(heartImageView, "alpha", 1.0f, 1.0f)
        pause.duration = 250 // 기존 300ms에서 줄임

        // Interpolator 추가 (부드러운 가속/감속 효과)
        val interpolator = android.view.animation.AccelerateDecelerateInterpolator()
        scaleUpX1.interpolator = interpolator
        scaleUpY1.interpolator = interpolator
        scaleDownX1.interpolator = interpolator
        scaleDownY1.interpolator = interpolator
        scaleUpX2.interpolator = interpolator
        scaleUpY2.interpolator = interpolator
        scaleDownX2.interpolator = interpolator
        scaleDownY2.interpolator = interpolator

        // 애니메이션 순서 설정
        val animatorSet = AnimatorSet()
        animatorSet.play(scaleUpX1).with(scaleUpY1)
        animatorSet.play(scaleDownX1).with(scaleDownY1).after(scaleUpX1)
        animatorSet.play(scaleUpX2).with(scaleUpY2).after(scaleDownX1)
        animatorSet.play(scaleDownX2).with(scaleDownY2).after(scaleUpX2)
        animatorSet.play(pause).after(scaleDownX2)

        // 반복 실행
        animatorSet.addListener(object : Animator.AnimatorListener {
            override fun onAnimationStart(animation: Animator) {}
            override fun onAnimationEnd(animation: Animator) {
                animatorSet.start() // 애니메이션 반복
            }

            override fun onAnimationCancel(animation: Animator) {}
            override fun onAnimationRepeat(animation: Animator) {}
        })

        animatorSet.start()
    }

}
