// package com.ddasoom.wear.util

package com.ddasoom.wear.util

import android.content.Context
import android.content.SharedPreferences
import org.json.JSONObject

// 수면 데이터 관련 로직
object SleepDataManager {
  private const val PREFS_NAME = "SleepData"
  private const val KEY_LAST_SLEEP_SEGMENT = "lastSleepSegment"

  // 수면 데이터를 저장하는 메서드
  fun saveSleepData(context: Context, sleepDataJson: JSONObject) {
    val sharedPreferences = context.getSharedPreferences(PREFS_NAME, Context.MODE_PRIVATE)
    sharedPreferences.edit().putString(KEY_LAST_SLEEP_SEGMENT, sleepDataJson.toString()).apply()
  }

  // 저장된 수면 데이터를 가져오는 메서드
  fun getSleepData(context: Context): JSONObject? {
    val sharedPreferences = context.getSharedPreferences(PREFS_NAME, Context.MODE_PRIVATE)
    val dataString = sharedPreferences.getString(KEY_LAST_SLEEP_SEGMENT, null)
    return dataString?.let { JSONObject(it) }
  }

  // 수면 데이터를 삭제하는 메서드
  fun clearSleepData(context: Context) {
    val sharedPreferences = context.getSharedPreferences(PREFS_NAME, Context.MODE_PRIVATE)
    sharedPreferences.edit().remove(KEY_LAST_SLEEP_SEGMENT).apply()
  }
}
