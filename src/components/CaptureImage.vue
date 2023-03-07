<style scoped>
#camera-preview video {
  max-width: 100%;
  max-height: 480px;
}

.camera-button {
  --border-radius: 32px;
}
</style>

<template>
  <div id="camera-preview"></div>
  <ion-button v-if="isCameraActive" class="camera-button fixed bottom-24 left-1/2 transform -translate-x-1/2"
    expand="block" @click="captureImage">
    <ion-icon slot="icon-only" :icon="camera"></ion-icon>
  </ion-button>

  <div v-if="cameraImage.length && !isCameraActive" class="mx-auto w-11/12">
    <div>
      <ion-img :src="cameraImage"></ion-img>
      <ion-label v-if="hasError" color="danger">
        {{ t('errors.generic') }}
      </ion-label>

      <div v-if="isUploading" class="text-center">
        <ion-spinner name="circular" color="light"></ion-spinner>
      </div>
      <div v-else class="grid grid-cols-2 gap-4 mt-2">
        <ion-button expand="block" fill="outline" color="danger" @click="doCancel">
          {{ t('cancel') }}
        </ion-button>
        <ion-button expand="block" color="primary" @click="doSend">
          {{ t('send') }}
        </ion-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  IonImg,
  IonButton,
  IonIcon,
  IonLabel,
  IonSpinner,
  toastController,
} from '@ionic/vue';
import { camera } from 'ionicons/icons';
import { ref, inject } from 'vue';
import { Plugins } from '@capacitor/core';
import { CameraPreviewOptions, CameraPreviewPictureOptions } from '@capacitor-community/camera-preview';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const axios: any = inject('axios');
const cameraImage: any = ref('');
const isCameraActive: any = ref(true);
const isUploading = ref(false);
const hasError = ref(false);

const startCamera = async () => {
  try {
    const cameraPreviewOptions: CameraPreviewOptions = {
      parent: 'camera-preview',
      toBack: true,
      position: 'rear',
      disableAudio: true,
      height: 480,
      y: 90
    };
    await Plugins.CameraPreview.start(cameraPreviewOptions);
    isCameraActive.value = true;
    cameraImage.value = '';
    hasError.value = false;
  } catch (error) {
    hasError.value = true;
  }
}
const stopCamera = async () => {
  isCameraActive.value = false;
  await Plugins.CameraPreview.stop();
}
const captureImage = async () => {
  try {
    const cameraPreviewPictureOptions: CameraPreviewPictureOptions = {
      quality: 50
    };
    const cameraOutput = await Plugins.CameraPreview.capture(cameraPreviewPictureOptions);
    cameraImage.value = `data:image/jpeg;base64,${cameraOutput.value}`;
    await stopCamera();
    hasError.value = false;
  } catch (error) {
    hasError.value = true;
  }
}
const doCancel = async () => {
  await startCamera();
}
const doSend = async () => {
  isUploading.value = true;
  try {
    const imageReq = await axios.post('exif', cameraImage.value);
    imageReq.data = imageReq.data.replace('status:', '"status":'); // Dirty fix, API sends invalid JSON
    const { status } = JSON.parse(imageReq.data);
    if (status === 'success') {
      const toast = await toastController.create({
        message: 'Camera image successfully sent.',
        color: 'success',
        duration: 2000,
        position: 'top'
      });

      await toast.present();
      await startCamera();
    } else {
      throw new Error('Unexpected result.');
    }
  } catch (error) {
    hasError.value = true;
  }
  isUploading.value = false;
}
// Start the camera feed onload
startCamera();
</script>
