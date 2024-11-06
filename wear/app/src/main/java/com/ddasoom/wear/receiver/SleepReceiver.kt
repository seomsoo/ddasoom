// package com.ddasoom.wear.receiver

package com.ddasoom.wear.receiver

import android.content.BroadcastReceiver
import android.content.Context
import android.content.Intent
import android.util.Log
import com.ddasoom.wear.constants.Constants
import com.ddasoom.wear.util.SleepDataManager
import com.google.android.gms.location.SleepSegmentEvent
import org.json.JSONObject

class SleepReceiver : BroadcastReceiver() {

  // 수면 데이터 수신 시 호출되는 메서드
  override fun onReceive(context: Context, intent: Intent) {
    val sleepSegments = SleepSegmentEvent.extractEvents(intent)
    sleepSegments?.forEach { segment ->
      saveSleepDataToMemory(context, segment)
    }
  }

  // 수면 데이터를 메모리에 저장하는 메서드
  private fun saveSleepDataToMemory(context: Context, segment: SleepSegmentEvent) {
    val sleepDataJson = JSONObject().apply {
      put("startTime", segment.startTimeMillis)
      put("endTime", segment.endTimeMillis)
      put("stage", segment.status)
    }

    SleepDataManager.saveSleepData(context, sleepDataJson)
    Log.d(Constants.TAG, "Sleep data saved: $sleepDataJson")
  }
}
