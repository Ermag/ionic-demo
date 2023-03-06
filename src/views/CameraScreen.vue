<style scoped>
  #camera-screen-content {
    --background: transparent;
  }
</style>

<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>{{ t('camera') }}</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content id="camera-screen-content" :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">{{ t('camera') }}</ion-title>
        </ion-toolbar>
      </ion-header>

      <CaptureImage />
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
  import { 
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent 
  } from '@ionic/vue';
  import CaptureImage from '@/components/CaptureImage.vue';
  import { useI18n } from 'vue-i18n';

  const { t } = useI18n();
</script>
