package com.ddasoom.wear.service

import android.util.Log
import com.google.android.gms.wearable.MessageEvent
import com.google.android.gms.wearable.WearableListenerService
import org.json.JSONObject

class MessageService : WearableListenerService() {
  companion object {
    private const val TAG = "WatchMessageService"
    private const val NOTI_PUSH_PATH = "/noti-push"
  }

  override fun onMessageReceived(messageEvent: MessageEvent) {
    if (messageEvent.path == NOTI_PUSH_PATH) {
      val message = String(messageEvent.data)
      Log.d(TAG, "Message received from phone: $message")

      try {
        val jsonObject = JSONObject(message)
        val receivedMessage = jsonObject.getString("message")
        Log.d(TAG, "Parsed message: $receivedMessage")

        // 여기서 받은 메시지를 처리합니다.
      } catch (e: Exception) {
        Log.e(TAG, "Failed to parse message", e)
      }
    } else {
      super.onMessageReceived(messageEvent)
    }
  }
}
