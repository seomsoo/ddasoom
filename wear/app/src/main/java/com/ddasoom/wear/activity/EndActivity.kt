package com.ddasoom.wear.activity

import android.content.Intent
import android.os.Bundle
import android.os.Handler
import android.os.Looper
import android.widget.Button
import androidx.appcompat.app.AppCompatActivity
import com.ddasoom.wear.R

class EndActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_end)

        // "확인" 버튼 클릭 이벤트
        val confirmButton = findViewById<Button>(R.id.btn_confirm_breath)
        confirmButton.setOnClickListener {
            // 메인 화면으로 이동
            val intent = Intent(this, MainActivity::class.java)
            intent.flags = Intent.FLAG_ACTIVITY_CLEAR_TOP or Intent.FLAG_ACTIVITY_NEW_TASK
            startActivity(intent)
            Handler(Looper.getMainLooper()).postDelayed({
                finish()
            }, 400) // 200ms 딜레이
        }
    }
}