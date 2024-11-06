// package com.ddasoom.wear.service

package com.ddasoom.wear.service

import android.util.Log
import com.ddasoom.wear.constants.Constants
import com.google.android.gms.wearable.MessageEvent
import com.google.android.gms.wearable.WearableListenerService
import org.json.JSONObject

// 받은 메시지 수신 로직
class MessageService : WearableListenerService() {

  // 메시지 수신 시 호출되는 메서드
  override fun onMessageReceived(messageEvent: MessageEvent) {
    if (messageEvent.path == Constants.NOTI_PUSH_PATH) {
      val message = String(messageEvent.data)
      Log.d(Constants.TAG, "Message received from phone: $message")

      try {
        val jsonObject = JSONObject(message)
        val receivedMessage = jsonObject.getString("message")
        Log.d(Constants.TAG, "Parsed message: $receivedMessage")

        // 받은 메시지를 처리하는 로직 추가
      } catch (e: Exception) {
        Log.e(Constants.TAG, "Failed to parse message", e)
      }
    } else {
      super.onMessageReceived(messageEvent)
    }
  }
}
