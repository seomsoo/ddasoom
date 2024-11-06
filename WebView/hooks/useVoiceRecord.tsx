import { useState } from "react";
import { Audio } from "expo-av";
import { Recording } from "expo-av/build/Audio";
import { postVoice } from "@/services/voice";

const useVoiceRecord = () => {
  const [recording, setRecording] = useState<Recording | undefined>(undefined);
  const [permissionResponse, requestPermission] = Audio.usePermissions();
  const [recordUri, setRecordUri] = useState<string | null>(null);

  async function startRecording() {
    try {
      // 기존 녹음이 있는 경우 중지
      if (recording) {
        await stopRecording();
      }

      // 권한 요청
      if (permissionResponse?.status !== "granted") {
        console.log("Requesting permission..");
        await requestPermission();
      }

      // 녹음 모드 설정
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      // 새 녹음 시작
      console.log("Starting recording..");
      const { recording: newRecording } = await Audio.Recording.createAsync(Audio.RecordingOptionsPresets.HIGH_QUALITY);
      setRecording(newRecording);
      console.log("Recording started");
    } catch (err) {
      console.error("Failed to start recording", err);
    }
  }

  async function stopRecording() {
    try {
      if (recording) {
        console.log("Stopping recording..");
        await recording.stopAndUnloadAsync();
        const uri = recording.getURI();
        console.log("Recording stopped and stored at", uri);
        setRecordUri(uri);
        setRecording(undefined);

        // 녹음 모드 해제
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: false,
        });
      }
    } catch (err) {
      console.error("Failed to stop recording", err);
    }
  }

  async function sendRecording(name: string) {
    try {
      if (!recordUri) {
        console.log("No recording URI found.");
        return;
      }

      const formData = new FormData();
      formData.append("voiceName", name);
      formData.append("files", {
        uri: recordUri, // 수정된 부분: url 대신 uri 사용
        name: "voice.m4a",
        type: "audio/m4a",
      } as any);

      console.log("센드 실행됨");
      console.log(formData);

      await postVoice(formData); // 비동기 처리 추가
    } catch (err) {
      console.error("Failed to send recording", err);
    }
  }

  return {
    startRecording,
    stopRecording,
    sendRecording,
    recording,
    recordUri,
  };
};

export default useVoiceRecord;
