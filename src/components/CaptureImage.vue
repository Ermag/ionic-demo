<style>
  #camera-preview video {
    max-width: 100%;
    max-height: 480px;
  }
</style>

<template>
  <ion-grid>
    <ion-row>
      <ion-col>
        <ion-img v-if="cameraImage.length && !isCameraActive" :src="cameraImage"></ion-img>
        <div id="camera-preview"></div>
      </ion-col>
    </ion-row>
    <ion-row v-if="isCameraActive">
      <ion-col>
        <ion-button expand="block" @click="captureImage">
          <ion-icon slot="icon-only" :icon="camera"></ion-icon>
        </ion-button>
      </ion-col>
    </ion-row>
    <ion-row v-else-if="isUploading">
      <ion-col class="ion-text-center">
        <ion-spinner name="circular"></ion-spinner>
      </ion-col>
    </ion-row>
    <ion-row v-else>
      <ion-col>
        <ion-button expand="block" fill="outline" color="medium" @click="doCancel">
          {{ t('cancel') }}
        </ion-button>
      </ion-col>
      <ion-col>
        <ion-button expand="block" color="success" @click="doSend">
          {{ t('send') }}
        </ion-button>
      </ion-col>
    </ion-row>

    <ion-row v-if="hasError">
      <ion-col class="ion-text-center">
        <ion-label color="danger">
          {{ t('errors.generic') }}
        </ion-label>
      </ion-col>
    </ion-row>
  </ion-grid>
</template>

<script setup lang="ts">
  import {
    IonImg,
    IonGrid,
    IonRow,
    IonCol,
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
    await Plugins.CameraPreview.stop();
    isCameraActive.value = false;
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
      imageReq.data = imageReq.data.replace('status', '"status"'); // Dirty fix, API sends invalid JSON
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
  startCamera()
</script>
