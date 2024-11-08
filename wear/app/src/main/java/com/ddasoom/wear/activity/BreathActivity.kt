package com.ddasoom.wear.activity

import android.animation.ObjectAnimator
import android.os.Bundle
import android.os.Handler
import android.os.Looper
import android.widget.ProgressBar
import android.widget.TextView
import com.ddasoom.wear.R
import androidx.appcompat.app.AppCompatActivity

class BreathActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_breath)

        // 프로그레스 바와 텍스트 뷰 연결
        val progressBar = findViewById<ProgressBar>(R.id.circularProgressBar)
        val phaseTextView = findViewById<TextView>(R.id.phaseTextView)
        val timerTextView = findViewById<TextView>(R.id.timerTextView)

        // 선택된 모드 가져오기
        val mode = intent.getStringExtra("breath_mode")

        // 설정값 초기화
        val intervals: IntArray
        val durations: IntArray
        val phases: Array<String>

        when (mode) {
            "basic" -> {
                intervals = intArrayOf(120, 120, 120) // 3등분
                durations = intArrayOf(4, 7, 8) // 초 단위
                phases = arrayOf("숨 들이마시기", "숨 참기", "숨 내쉬기")
            }
            "short" -> {
                intervals = intArrayOf(90, 90, 90, 90) // 4등분
                durations = intArrayOf(4, 4, 4, 4) // 초 단위
                phases = arrayOf("숨 들이마시기", "숨 참기", "숨 내쉬기", "숨 참기")
            }
            "long" -> {
                intervals = intArrayOf(120, 120, 120) // 3등분
                durations = intArrayOf(5, 7, 3) // 초 단위
                phases = arrayOf("숨 들이마시기", "숨 참기", "숨 내쉬기")
            }
            else -> return
        }

        // 프로그레스 바 최대값 설정
        progressBar.max = 360

        // 프로그레스 바와 텍스트 업데이트
        val handler = Handler(Looper.getMainLooper())
        var totalProgress = 0
        var totalTime = 0

        for (i in phases.indices) {
            val phase = phases[i]
            val duration = durations[i]
            val interval = intervals[i]

            // 각 구간 업데이트
            handler.postDelayed({
                // 단계 텍스트 업데이트
                phaseTextView.text = phase
                timerTextView.text = "${duration}초"

                // 프로그레스 바 애니메이션
                ObjectAnimator.ofInt(progressBar, "progress", totalProgress, totalProgress + interval)
                    .apply {
                        this.duration = (duration * 1000).toLong() // 밀리초로 변환
                        start()
                    }

                totalProgress += interval
            }, totalTime * 1000L)

            totalTime += duration
        }
    }
}
