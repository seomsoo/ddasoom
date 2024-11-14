package com.ddasoom.wear.util

import org.pytorch.Module
import org.pytorch.Tensor
import org.pytorch.IValue
import org.pytorch.LiteModuleLoader
import android.content.Context
import android.util.Log
import java.io.File
import java.io.FileNotFoundException
import java.io.FileOutputStream

object PytorchModelUtils {

    fun runModel(context: Context, inputData: FloatArray): FloatArray {
        // 모델 파일 이름
        val modelFileName = "panic_attack_prediction.ptl"

        // 파일 경로 확인
        val modelPath = assetFilePath(context, modelFileName)
        Log.d("DEBUG", "Model path: $modelPath")

        // 파일 존재 여부 확인
        val file = File(modelPath)
        if (file.exists()) {
            Log.d("DEBUG", "Model file exists")
        } else {
            Log.e("DEBUG", "Model file does not exist")
            throw FileNotFoundException("Model file not found at path: $modelPath")
        }

        // 모델 로드
        val model: Module = LiteModuleLoader.load(modelPath)

        val mean = floatArrayOf(788.7329f, 785.9198f, 77.0230f, 11.3669f)
        val scale = floatArrayOf(120.6631f, 124.1078f, 72.2979f, 6.2006f)

        val normalizedInputData = normalizeInput(inputData, mean, scale)

        // 입력 텐서 준비
        val inputTensor = Tensor.fromBlob(normalizedInputData, longArrayOf(1, normalizedInputData.size.toLong()))

        // 예측 실행
        val outputTensor: Tensor = model.forward(IValue.from(inputTensor)).toTensor()

        // 출력 결과 처리
        return outputTensor.getDataAsFloatArray()
    }

    fun assetFilePath(context: Context, fileName: String): String {
        val file = File(context.filesDir, fileName)
        if (!file.exists()) {
            Log.d("DEBUG", "File not found in filesDir. Copying from assets...")
            try {
                context.assets.open(fileName).use { inputStream ->
                    FileOutputStream(file).use { outputStream ->
                        val buffer = ByteArray(1024)
                        var length: Int
                        while (inputStream.read(buffer).also { length = it } > 0) {
                            outputStream.write(buffer, 0, length)
                        }
                        Log.d("DEBUG", "File copied successfully to ${file.absolutePath}")
                    }
                }
            } catch (e: Exception) {
                Log.e("DEBUG", "Failed to copy file: ${e.message}", e)
                throw RuntimeException("Failed to copy asset file: $fileName")
            }
        } else {
            Log.d("DEBUG", "File already exists in filesDir: ${file.absolutePath}")
        }
        return file.absolutePath
    }

    fun normalizeInput(inputData: FloatArray, mean: FloatArray, scale: FloatArray): FloatArray {
        return inputData.mapIndexed { index, value -> (value - mean[index]) / scale[index] }.toFloatArray()
    }
}