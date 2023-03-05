<template>
  <ion-tab-bar slot="bottom">
    <ion-tab-button tab="tab1" href="/tabs/home">
      <ion-icon aria-hidden="true" :icon="camera" />
      <ion-label>Camera</ion-label>
    </ion-tab-button>

    <ion-tab-button tab="tab2" href="/tabs/logs">
      <ion-icon aria-hidden="true" :icon="fileTrayFull" />
      <ion-label>Logs</ion-label>
    </ion-tab-button>

    <ion-tab-button tab="tab3" href="/tabs/settings">
      <ion-icon aria-hidden="true" :icon="settings" />
      <ion-label>Settings</ion-label>
    </ion-tab-button>
  </ion-tab-bar>
</template>

<script setup lang="ts">
  import {
    IonTabBar, 
    IonTabButton, 
    IonLabel, 
    IonIcon,
  } from '@ionic/vue';
  import { camera, fileTrayFull, settings } from 'ionicons/icons';
</script>
