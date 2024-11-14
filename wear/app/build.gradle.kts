plugins {
  alias(libs.plugins.android.application)
  alias(libs.plugins.jetbrains.kotlin.android)
}

android {
  namespace = "com.ddasoom.wear"
  compileSdk = 34

  defaultConfig {
    applicationId = "com.ddasoom.wear"
    minSdk = 33
    targetSdk = 34
    versionCode = 1
    versionName = "1.0"
    vectorDrawables {
      useSupportLibrary = true
    }

  }




  buildTypes {
    release {
      isMinifyEnabled = false
      proguardFiles(getDefaultProguardFile("proguard-android-optimize.txt"), "proguard-rules.pro")
    }
  }
  compileOptions {
    sourceCompatibility = JavaVersion.VERSION_1_8
    targetCompatibility = JavaVersion.VERSION_1_8
  }
  kotlinOptions {
    jvmTarget = "1.8"
  }
  buildFeatures {
    compose = true
    viewBinding = true  // ViewBinding 활성화
  }
  composeOptions {
    kotlinCompilerExtensionVersion = "1.5.1"
  }
  packaging {
    resources {
      excludes += "/META-INF/{AL2.0,LGPL2.1}"
    }
  }
}

dependencies {

  implementation(libs.play.services.wearable)
  implementation(platform(libs.compose.bom))
  implementation(libs.ui)
  implementation(libs.ui.tooling.preview)
  implementation(libs.compose.foundation)
  implementation(libs.activity.compose)
  implementation(libs.core.splashscreen)
  implementation(libs.wear)
  androidTestImplementation(platform(libs.compose.bom))
  androidTestImplementation(libs.ui.test.junit4)
  debugImplementation(libs.ui.tooling)
  debugImplementation(libs.ui.test.manifest)

  // Wear OS 라이브러리
  implementation("androidx.wear:wear:1.2.0")
  implementation ("com.google.android.gms:play-services-wearable:18.1.0")
  implementation("androidx.activity:activity-ktx:1.7.2")
  implementation("androidx.fragment:fragment-ktx:1.6.1")
  implementation("androidx.core:core-ktx:1.7.0")
  implementation("androidx.appcompat:appcompat:1.4.0")

  // Health Connect 라이브러리
  implementation("androidx.health.connect:connect-client:1.0.0-alpha10")

  // Sleep API
  implementation("com.google.android.gms:play-services-location:21.0.1")

  implementation("com.google.android.gms:play-services-wearable:18.0.0")
  implementation("com.google.android.gms:play-services-base:18.0.0")
  implementation("androidx.localbroadcastmanager:localbroadcastmanager:1.1.0")

  // PyTorch Android Lite
  implementation("org.pytorch:pytorch_android_lite:1.13.1")
}
