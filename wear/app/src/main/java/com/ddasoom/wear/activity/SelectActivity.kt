package com.ddasoom.wear.activity


import android.content.Intent
import android.os.Bundle
import android.util.Log
import android.widget.Button
import com.ddasoom.wear.R
import androidx.appcompat.app.AppCompatActivity
import com.google.android.gms.wearable.PutDataMapRequest
import com.google.android.gms.wearable.Wearable

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
            saveBreathModeToWatch("basic")
            startBreathActivity("basic")
        }

        btnShortBreath.setOnClickListener {
            saveBreathModeToWatch("short")
            startBreathActivity("short")
        }

        btnLongBreath.setOnClickListener {
            saveBreathModeToWatch("long")
            startBreathActivity("long")
        }
    }

    // 다음 액티비티로 데이터를 전달하는 함수
    private fun startBreathActivity(mode: String) {
        val intent = Intent(this, BreathActivity::class.java)
        intent.putExtra("breath_mode", mode) // 선택한 모드 전달
        startActivity(intent)
    }

    //워치에 호흡법 종류 저장
    private fun saveBreathModeToWatch(mode: String) {
        val putDataMapRequest = PutDataMapRequest.create("/breath_mode")
        putDataMapRequest.dataMap.putString("breath_mode", mode)
        val putDataRequest = putDataMapRequest.asPutDataRequest()
        Wearable.getDataClient(this).putDataItem(putDataRequest)
            .addOnSuccessListener {
                Log.d("SelectActivity", "Breath mode saved to watch: $mode")
            }
            .addOnFailureListener {
                Log.e("SelectActivity", "Failed to save breath mode", it)
            }
    }
}
