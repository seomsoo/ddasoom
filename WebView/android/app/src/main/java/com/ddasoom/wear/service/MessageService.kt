package com.ddasoom.wear

import android.app.Notification
import android.app.NotificationChannel
import android.app.NotificationManager
import android.app.Service
import android.content.Intent
import android.os.Build
import android.os.IBinder
import android.util.Log
import androidx.core.app.NotificationCompat
import com.google.android.gms.wearable.MessageClient
import com.google.android.gms.wearable.MessageEvent
import com.google.android.gms.wearable.Wearable
import org.json.JSONObject

class MessageService : Service(), MessageClient.OnMessageReceivedListener {

    private val CHANNEL_ID = "ForegroundServiceChannel"
    private val TAG = "MessageService"

    override fun onCreate() {
        super.onCreate()
        createNotificationChannel()
        startForeground(1, createNotification())

        // Bluetooth 메시지 수신 리스너 추가
        Wearable.getMessageClient(this).addListener(this)
    }

    override fun onMessageReceived(messageEvent: MessageEvent) {
        if (messageEvent.path == "/noti-push") {
            try {
                val message = String(messageEvent.data)
                val jsonObject = JSONObject(message)
                val title = jsonObject.getString("title")
                val content = jsonObject.get("content")

                val intent = Intent("WatchMessageReceived")
                intent.putExtra("title", title)
                intent.putExtra("content", content.toString())
                sendBroadcast(intent) // React Native로 브로드캐스트 전송
            } catch (e: Exception) {
                Log.e(TAG, "Failed to parse message", e)
            }
        }
    }

    private fun createNotificationChannel() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            val serviceChannel = NotificationChannel(
                CHANNEL_ID,
                "Foreground Service Channel",
                NotificationManager.IMPORTANCE_DEFAULT
            )
            val manager = getSystemService(NotificationManager::class.java)
            manager.createNotificationChannel(serviceChannel)
        }
    }

    private fun createNotification(): Notification {
        return NotificationCompat.Builder(this, CHANNEL_ID)
            .setContentTitle("Message Service")
            .setContentText("Listening for messages from the watch.")
            .setSmallIcon(R.drawable.ic_launcher)
            .build()
    }

    override fun onBind(intent: Intent?): IBinder? = null

    override fun onDestroy() {
        super.onDestroy()
        // 메시지 리스너 제거
        Wearable.getMessageClient(this).removeListener(this)
    }
}
