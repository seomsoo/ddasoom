package com.ddasoom.wear.activity

import android.content.Intent
import android.os.Bundle
import android.widget.Button
import android.widget.TextView
import androidx.appcompat.app.AppCompatActivity
import com.ddasoom.wear.R
import com.google.android.gms.wearable.DataMapItem
import com.google.android.gms.wearable.Wearable

class RequestActivity : AppCompatActivity(), com.google.android.gms.wearable.DataClient.OnDataChangedListener {

    private lateinit var heartRateTextView: TextView
    private lateinit var btnYes: Button
    private lateinit var btnNo: Button
    private var heartRate: String = "--" // 기본값

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_request)

        // XML과 연결
        heartRateTextView = findViewById(R.id.request_text_number)
        btnYes = findViewById(R.id.btn_request_yes)
        btnNo = findViewById(R.id.btn_request_no)

        // "네" 버튼 클릭 시 BreathActivity로 이동
        btnYes.setOnClickListener {
            val intent = Intent(this, BreathActivity::class.java)
            startActivity(intent)
            finish() // 현재 액티비티 종료
        }

        // "아니오" 버튼 클릭 시 RequestActivity 종료
        btnNo.setOnClickListener {
            finish() // 단순히 액티비티를 종료
        }
    }

    override fun onResume() {
        super.onResume()
        Wearable.getDataClient(this).addListener(this)
    }

    override fun onPause() {
        super.onPause()
        Wearable.getDataClient(this).removeListener(this)
    }

    override fun onDataChanged(dataEvents: com.google.android.gms.wearable.DataEventBuffer) {
        for (event in dataEvents) {
            if (event.type == com.google.android.gms.wearable.DataEvent.TYPE_CHANGED) {
                val dataItem = event.dataItem
                if (dataItem.uri.path == "/heart_rate") {
                    // 심박수 데이터를 읽음
                    heartRate = DataMapItem.fromDataItem(dataItem).dataMap.getString("heart_rate") ?: "--"
                    runOnUiThread {
                        // UI 업데이트
                        heartRateTextView.text = heartRate
                    }
                }
            }
        }
    }
}
