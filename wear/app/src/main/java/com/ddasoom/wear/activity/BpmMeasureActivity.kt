package com.ddasoom.wear.activity

import android.content.BroadcastReceiver
import android.content.Context
import android.content.Intent
import android.content.IntentFilter
import android.os.Bundle
import android.widget.TextView
import androidx.appcompat.app.AppCompatActivity
import androidx.localbroadcastmanager.content.LocalBroadcastManager
import com.ddasoom.wear.R
import com.ddasoom.wear.service.ForegroundService

class BpmMeasureActivity : AppCompatActivity() {

    private lateinit var heartRateValueText: TextView

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_bpm_measure)

        // 심박수 텍스트뷰 연결
        heartRateValueText = findViewById(R.id.text_heart_rate_value)

        // ForegroundService의 콜백 등록
        ForegroundService.heartRateCallback = { heartRate ->
            runOnUiThread {
                heartRateValueText.text = heartRate.toString()
            }
        }
    }

    override fun onDestroy() {
        super.onDestroy()
        // Activity 종료 시 콜백 해제
        ForegroundService.heartRateCallback = null
    }




}
