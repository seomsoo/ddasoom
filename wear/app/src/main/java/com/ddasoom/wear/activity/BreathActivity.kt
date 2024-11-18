package com.ddasoom.wear.activity

import android.animation.ObjectAnimator
import android.content.Intent
import android.os.Bundle
import android.os.Handler
import android.os.Looper
import android.view.WindowManager
import android.widget.Button
import android.widget.ProgressBar
import android.widget.TextView
import androidx.appcompat.app.AppCompatActivity
import com.ddasoom.wear.R
import com.google.android.gms.wearable.DataMapItem
import com.google.android.gms.wearable.Wearable

class BreathActivity : AppCompatActivity() {

    private var mode: String? = null
    private var isFromSelectActivity: Boolean = false

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_breath)

        // 화면 꺼짐 방지 설정
        window.addFlags(WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON)

        // 텍스트 뷰와 버튼 연결
        val phaseTextView = findViewById<TextView>(R.id.phaseTextView)
        val timerTextView = findViewById<TextView>(R.id.timerTextView)
        val stopButton = findViewById<Button>(R.id.breath_stop)

        // 화면 진입 경로 확인
        if (intent.hasExtra("breath_mode")) {
            mode = intent.getStringExtra("breath_mode")
            isFromSelectActivity = true
            setupBreathing(phaseTextView, timerTextView, stopButton)
        } else {
            retrieveBreathModeFromWatch { retrievedMode ->
                mode = retrievedMode
                isFromSelectActivity = false
                setupBreathing(phaseTextView, timerTextView, stopButton)
            }
        }
    }

    private fun retrieveBreathModeFromWatch(callback: (String?) -> Unit) {
        Wearable.getDataClient(this).dataItems.addOnSuccessListener { dataItems ->
            var retrievedMode: String? = null
            for (dataItem in dataItems) {
                if (dataItem.uri.path == "/breath_mode") {
                    retrievedMode = DataMapItem.fromDataItem(dataItem).dataMap.getString("breath_mode")
                    break
                }
            }
            callback(retrievedMode ?: "basic")
        }.addOnFailureListener {
            callback("basic")
        }
    }

    private fun setupBreathing(
        phaseTextView: TextView,
        timerTextView: TextView,
        stopButton: Button
    ) {
        val intervals: IntArray
        val durations: IntArray
        val phases: Array<String>

        when (mode) {
            "basic" -> {
                intervals = intArrayOf(120, 120, 120)
                durations = intArrayOf(4, 7, 8)
                phases = arrayOf("숨 들이마시기", "숨 참기", "숨 내쉬기")
            }
            "short" -> {
                intervals = intArrayOf(90, 90, 90, 90)
                durations = intArrayOf(4, 4, 4, 4)
                phases = arrayOf("숨 들이마시기", "숨 참기", "숨 내쉬기", "숨 참기")
            }
            "long" -> {
                intervals = intArrayOf(120, 120, 120)
                durations = intArrayOf(5, 7, 3)
                phases = arrayOf("숨 들이마시기", "숨 참기", "숨 내쉬기")
            }
            else -> {
                intervals = intArrayOf(120, 120, 120)
                durations = intArrayOf(4, 7, 8)
                phases = arrayOf("숨 들이마시기", "숨 참기", "숨 내쉬기")
            }
        }

        // 반복 실행
        val handler = Handler(Looper.getMainLooper())

        fun startBreathingCycle() {
            var totalTime = 0

            for (i in phases.indices) {
                val phase = phases[i]
                val duration = durations[i]

                handler.postDelayed({
                    // 단계 텍스트 업데이트
                    phaseTextView.text = phase

                    // 남은 시간 업데이트 로직
                    var remainingTime = duration
                    val countdownHandler = Handler(Looper.getMainLooper())
                    val countdownRunnable = object : Runnable {
                        override fun run() {
                            if (remainingTime > 0) {
                                timerTextView.text = "$remainingTime 초"
                                remainingTime--
                                countdownHandler.postDelayed(this, 1000)
                            } else {
                                countdownHandler.removeCallbacks(this)
                            }
                        }
                    }
                    countdownHandler.post(countdownRunnable)

                }, totalTime * 1000L)

                totalTime += duration
            }

            // 모든 단계가 끝난 후 반복
            handler.postDelayed({
                startBreathingCycle() // 반복 실행
            }, totalTime * 1000L)
        }

        startBreathingCycle()

        // "상황 종료" 버튼 클릭 이벤트
        stopButton.setOnClickListener {
            handler.removeCallbacksAndMessages(null) // 모든 핸들러 작업 중지
            val intent = Intent(this, EndActivity::class.java)
            intent.flags = Intent.FLAG_ACTIVITY_CLEAR_TOP or Intent.FLAG_ACTIVITY_NEW_TASK
            startActivity(intent)
            Handler(Looper.getMainLooper()).postDelayed({
                finish()
            }, 400) // 200ms 딜레이
        }
    }
}

