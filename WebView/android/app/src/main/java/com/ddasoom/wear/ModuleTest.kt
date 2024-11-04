package com.ddasoom.wear

import android.util.Log
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.*
import com.facebook.react.modules.core.DeviceEventManagerModule
import com.google.android.gms.wearable.MessageClient
import com.google.android.gms.wearable.MessageEvent
import com.google.android.gms.wearable.Wearable
import org.json.JSONObject

class ModuleTest(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext), MessageClient.OnMessageReceivedListener{

//  private var latestMessage: String = "failed"  // 최신 메시지를 저장할 변수

  private val HEART_RATE_EVENT = "onHeartRateReceived"
  private val TAG = "HeartRateModule"

  init {
    // MessageClient 리스너 등록
    Wearable.getMessageClient(reactContext).addListener(this)
  }

  // 모듈 네이밍 선언
  override fun getName(): String {
    return "ModuleTest"
  }

  override fun onMessageReceived(messageEvent: MessageEvent) {
    if (messageEvent.path == "/noti-push") {
      try {
        val message = String(messageEvent.data)
        val jsonObject = JSONObject(message)
        val heartRate = jsonObject.getString("message")

        // React Native로 이벤트 전송
        sendEvent(heartRate)
      } catch (e: Exception) {
        e.printStackTrace()
      }
    }
  }

  private fun sendEvent(heartRate: String) {
    try {
      reactApplicationContext
        .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
        .emit(HEART_RATE_EVENT, heartRate)
    } catch (e: Exception) {
      e.printStackTrace()
    }
  }


  // JS에서 모듈명.getConstants().DEFAULT_EVENT_NAME 으로 네이티브 모듈 데이터 받음
  // 이름 바꾸면 됨
//  override fun getConstants(): Map<String, String?> {
//    return mapOf("DEFAULT" to latestMessage)
//  }

  // `addListener` 메서드 추가
  @ReactMethod
  fun addListener(eventName: String) {
    // 리스너를 추가할 때 필요한 로직이 있다면 여기에 작성할 수 있습니다.
    Log.d("ModuleTest", "이벤트 리스너 추가됨 : $eventName")
  }

  // `removeListeners` 메서드 추가
  @ReactMethod
  fun removeListeners(count: Int) {
    // 필요한 경우, 리스너 제거 시의 로직을 여기에 추가할 수 있습니다.
    Log.d("ModuleTest", "@@@@@@@@@@@@@@@@@@@테스트 모듈 제거됨 $count listeners")
  }

  @Deprecated("Deprecated in Java")
  override fun onCatalystInstanceDestroy() {
    super.onCatalystInstanceDestroy()
    // 리스너 제거
    Wearable.getMessageClient(reactApplicationContext).removeListener(this)
  }
}