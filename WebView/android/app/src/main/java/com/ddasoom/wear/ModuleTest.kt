package com.ddasoom.wear

import android.util.Log
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.*
import com.facebook.react.modules.core.DeviceEventManagerModule

class ModuleTest(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext){

  private var latestMessage: String = "왜 안되냐"  // 최신 메시지를 저장할 변수

  // 모듈 네이밍 선언
  override fun getName(): String {
    return "ModuleTest"
  }

  // 네이티브 이벤트 핸들러 함수
  @ReactMethod
  fun onHandleNativeEvent() {
    Log.d("모듈 테스트", "//// 모듈 생성 이벤트 호출됨")
  }



  // JS에서 모듈명.getConstants().DEFAULT_EVENT_NAME 으로 네이티브 모듈 데이터 받음
  // 이름 바꾸면 됨
  override fun getConstants(): Map<String, String?> {
    return mapOf("DEFAULT" to latestMessage)
  }

  // JavaScript에서 메시지를 가져올 수 있는 메서드
  @ReactMethod
  fun getLatestMessage(): String {
    return latestMessage
  }

  @ReactMethod(isBlockingSynchronousMethod = true)  // 동기 메서드임을 명시
  fun getCurrentMessage(): String {
    return latestMessage
  }

  // 메시지를 설정하고 React Native로 이벤트 전달
  fun setLatestMessage(message: String) {
    latestMessage = message
    sendEventToReactNative("onMessageReceived", message)
  }


  private fun sendEventToReactNative(eventName: String, message: String) {
    reactApplicationContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
      ?.emit(eventName, message)
  }

  // `addListener` 메서드 추가
  @ReactMethod
  fun addListener(eventName: String) {
    // 리스너를 추가할 때 필요한 로직이 있다면 여기에 작성할 수 있습니다.
    Log.d("ModuleTest", "이벤트 리스너 추가됨 : $eventName")
  }

  @ReactMethod
  fun getCurrentMessage(promise: Promise) {
    promise.resolve(latestMessage)
  }

  // `removeListeners` 메서드 추가
  @ReactMethod
  fun removeListeners(count: Int) {
    // 필요한 경우, 리스너 제거 시의 로직을 여기에 추가할 수 있습니다.
    Log.d("ModuleTest", "@@@@@@@@@@@@@@@@@@@테스트 모듈 제거됨 $count listeners")
  }
}