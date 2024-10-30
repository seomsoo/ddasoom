package com.ddasoom.wear

import com.facebook.react.ReactPackage
import com.facebook.react.bridge.NativeModule
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.uimanager.ViewManager

class MyAppPackage : ReactPackage {
  override fun createViewManagers(reactContext: ReactApplicationContext): List<ViewManager<*, *>> {
    return emptyList()
  }

  override fun createNativeModules(reactContext: ReactApplicationContext): MutableList<NativeModule> {
    // 모듈화할 패키지 추가
    return mutableListOf(ModuleTest(reactContext))
  }
}