package com.ddasoom.wear.service

import android.util.Log
import com.ddasoom.wear.ModuleTest
import com.facebook.react.ReactApplication
import com.facebook.react.bridge.ReactApplicationContext
import com.google.android.gms.wearable.MessageEvent
import com.google.android.gms.wearable.WearableListenerService
import org.json.JSONObject

class MessageService : WearableListenerService() {
  companion object {
    private const val TAG = "PhoneMessageService"
    private const val NOTI_PUSH_PATH = "/noti-push"
  }

  private var reactApplicationContext: ReactApplicationContext? = null

  override fun onCreate() {
    super.onCreate()
    // ReactApplicationContext 가져오기
    val application = applicationContext as ReactApplication
    reactApplicationContext = application.reactNativeHost.reactInstanceManager.currentReactContext as ReactApplicationContext?
  }

  override fun onMessageReceived(messageEvent: MessageEvent) {
    Log.d(TAG, "MessageReceived가 실행은 됨: $messageEvent.data")

    if (messageEvent.path == NOTI_PUSH_PATH) {
      val message = String(messageEvent.data)
      Log.d(TAG, "Message received from watch: $message")

      try {
        val jsonObject = JSONObject(message)
        val receivedMessage = jsonObject.getString("message")
        Log.d(TAG, "Parsed message: $receivedMessage")

        // 여기서 받은 메시지를 처리
        // ModuleTest 인스턴스 생성 및 메시지 전달
        reactApplicationContext?.let {
          val moduleTest = it.getNativeModule(ModuleTest::class.java)
          moduleTest?.setLatestMessage(receivedMessage)
        }

      } catch (e: Exception) {
        Log.e(TAG, "Failed to parse message", e)
      }
    } else {
      super.onMessageReceived(messageEvent)
    }
  }
}
