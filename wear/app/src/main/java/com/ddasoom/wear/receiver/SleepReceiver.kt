package com.ddasoom.wear.receiver

import android.content.BroadcastReceiver
import android.content.Context
import android.content.Intent
import android.util.Log
import com.google.android.gms.location.SleepSegmentEvent
import org.json.JSONObject

class SleepReceiver : BroadcastReceiver() {
  override fun onReceive(context: Context, intent: Intent) {
    val sleepSegments = SleepSegmentEvent.extractEvents(intent)
    sleepSegments?.forEach { segment ->
      // 수면 데이터를 메모리에 저장
      saveSleepDataToMemory(context, segment)
    }
  }

  private fun saveSleepDataToMemory(context: Context, segment: SleepSegmentEvent) {
    val sharedPreferences = context.getSharedPreferences("SleepData", Context.MODE_PRIVATE)
    val editor = sharedPreferences.edit()

    // 수면 데이터 JSON 형식으로 저장
    val sleepDataJson = JSONObject().apply {
      put("startTime", segment.startTimeMillis)
      put("endTime", segment.endTimeMillis)
      put("stage", segment.status)
    }

    editor.putString("lastSleepSegment", sleepDataJson.toString())
    editor.apply()

    Log.d("SleepReceiver", "Sleep data saved: $sleepDataJson")
  }
}