<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Logs</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Logs</ion-title>
        </ion-toolbar>
      </ion-header>

      <LogItems />
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
  import { 
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
  } from '@ionic/vue';
  import LogItems from '../components/LogItems.vue'
</script>
