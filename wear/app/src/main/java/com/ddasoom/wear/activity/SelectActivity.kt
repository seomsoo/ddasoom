package com.ddasoom.wear.activity


import android.content.Intent
import android.os.Bundle
import android.widget.Button
import com.ddasoom.wear.R
import androidx.appcompat.app.AppCompatActivity

class SelectActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_select)

        // 버튼 연결
        val btnBasicBreath = findViewById<Button>(R.id.btn_basic_breath)
        val btnShortBreath = findViewById<Button>(R.id.btn_short_breath)
        val btnLongBreath = findViewById<Button>(R.id.btn_long_breath)

        // 버튼 클릭 시 다음 액티비티로 데이터 전달
        btnBasicBreath.setOnClickListener {
            startBreathActivity("basic")
        }

        btnShortBreath.setOnClickListener {
            startBreathActivity("short")
        }

        btnLongBreath.setOnClickListener {
            startBreathActivity("long")
        }
    }

    // 다음 액티비티로 데이터를 전달하는 함수
    private fun startBreathActivity(mode: String) {
        val intent = Intent(this, BreathActivity::class.java)
        intent.putExtra("breath_mode", mode) // 선택한 모드 전달
        startActivity(intent)
    }
}
