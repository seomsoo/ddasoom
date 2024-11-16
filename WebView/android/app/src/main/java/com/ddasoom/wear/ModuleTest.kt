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

class ModuleTest(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext), MessageClient.OnMessageReceivedListener {

    private val HEART_RATE_EVENT = "onHeartRateReceived"
    private val EMERGENCY_EVENT = "onEmergencyReceived"
    private val TAG = "ModuleTest"

    init {
        // MessageClient 리스너 등록
        Wearable.getMessageClient(reactContext).addListener(this)
    }

    // 모듈 네임 정의
    override fun getName(): String {
        return "ModuleTest"
    }

    override fun onMessageReceived(messageEvent: MessageEvent) {
        if (messageEvent.path == "/noti-push") {
            try {
                val message = String(messageEvent.data)
                val jsonObject = JSONObject(message)
                val title = jsonObject.getString("title")
                val content = jsonObject.get("content")

                when (title) {
                    "bpm" -> {
                        val heartRate = content.toString()
                        Log.d(TAG, "Received BPM: $heartRate")
                        // React Native로 이벤트 전송
                        sendEvent(HEART_RATE_EVENT, heartRate)
                    }
                    "EMERGENCY" -> {
                        val modelResult = content.toString()
                        Log.d(TAG, "Received EMERGENCY: $modelResult")
                        // React Native로 이벤트 전송
                        sendEvent(EMERGENCY_EVENT, modelResult)
                    }
                    else -> {
                        Log.d(TAG, "Unknown title: $title")
                    }
                }
            } catch (e: Exception) {
                Log.e(TAG, "Failed to parse message", e)
            }
        }
    }

    private fun sendEvent(eventName: String, data: String) {
        try {
            reactApplicationContext
                .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
                .emit(eventName, data)
        } catch (e: Exception) {
            Log.e(TAG, "Failed to send event to JS", e)
        }
    }

    // `addListener` 메서드
    @ReactMethod
    fun addListener(eventName: String) {
        // 리스너 추가 시 필요한 로직이 있다면 여기에 작성합니다.
        Log.d(TAG, "Listener added: $eventName")
    }

    // `removeListeners` 메서드
    @ReactMethod
    fun removeListeners(count: Int) {
        // 리스너 제거 시 필요한 로직이 있다면 여기에 작성합니다.
        Log.d(TAG, "Listeners removed: $count")
    }

    override fun onCatalystInstanceDestroy() {
        super.onCatalystInstanceDestroy()
        // 리스너 제거
        Wearable.getMessageClient(reactApplicationContext).removeListener(this)
    }
}
