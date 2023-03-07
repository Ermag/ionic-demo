<style scoped>
#camera-screen-content {
  --background: transparent;
}
</style>

<template>
  <ion-page>
    <ion-content id="camera-screen-content" :fullscreen="true">
      <CaptureImage />
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonPage,
  IonContent
} from '@ionic/vue';
import CaptureImage from '@/components/CaptureImage.vue';
import { StatusBar, Style } from '@capacitor/status-bar';
StatusBar.setStyle({ style: Style.Light });
</script>
