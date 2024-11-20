package com.ddasoom.wear.activity

    import android.content.Intent
    import android.os.Bundle
    import android.widget.Button
    import android.widget.TextView
    import androidx.appcompat.app.AppCompatActivity
    import com.ddasoom.wear.R

    class EmergencyActivity : AppCompatActivity() {

        private lateinit var endText1: TextView
        private lateinit var endText2: TextView
        private lateinit var endText3: TextView
        private lateinit var endText4: TextView
        private lateinit var confirmBreathButton: Button

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_emergency) // XML 파일 연결

        // UI 요소 초기화
        endText1 = findViewById(R.id.end_text_1)
        endText2 = findViewById(R.id.end_text_2)
        endText3 = findViewById(R.id.end_text_3)
        endText4 = findViewById(R.id.end_text_4)
        confirmBreathButton = findViewById(R.id.btn_confirm_breath)

        // "닫기" 버튼 클릭 이벤트 처리
        confirmBreathButton.setOnClickListener {
            // Activity 종료
            finish()
        }
    }
}
