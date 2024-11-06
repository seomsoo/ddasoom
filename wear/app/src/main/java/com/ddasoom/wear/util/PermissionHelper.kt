// package com.ddasoom.wear.util

package com.ddasoom.wear.util

import android.Manifest
import android.content.Context
import android.content.pm.PackageManager
import androidx.core.content.ContextCompat

// 권한 관련 로직 처리
object PermissionHelper {
  // 필요한 권한 목록을 반환하는 메서드
  fun getRequiredPermissions(): Array<String> {
    return if (android.os.Build.VERSION.SDK_INT >= android.os.Build.VERSION_CODES.S) {
      arrayOf(
        Manifest.permission.BODY_SENSORS,
      )
    } else {
      arrayOf(
        Manifest.permission.BODY_SENSORS,
        Manifest.permission.WAKE_LOCK,
        Manifest.permission.FOREGROUND_SERVICE
      )
    }
  }

  // 권한이 부여되었는지 확인하는 메서드
  fun checkPermissions(context: Context, permissions: Array<String>): Boolean {
    return permissions.all {
      ContextCompat.checkSelfPermission(context, it) == PackageManager.PERMISSION_GRANTED
    }
  }
}
