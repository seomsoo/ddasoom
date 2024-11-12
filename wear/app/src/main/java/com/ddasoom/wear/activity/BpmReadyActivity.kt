package com.ddasoom.wear.activity

import android.content.Intent
import android.os.Bundle
import android.widget.Button
import androidx.appcompat.app.AppCompatActivity
import com.ddasoom.wear.R

class BpmReadyActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_bpm_ready) // XML 파일과 연결

        // "측정" 버튼 연결
        val measureButton = findViewById<Button>(R.id.button_measure)
        measureButton.setOnClickListener {
            // BpmMeasureActivity로 이동
            val intent = Intent(this, BpmMeasureActivity::class.java)
            startActivity(intent)
        }
    }
}
