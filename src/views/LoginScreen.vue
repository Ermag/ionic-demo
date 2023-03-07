<style scoped>
ion-toolbar#app-logo {
  --background: var(--ion-color-secondary);
  --border-width: 0;
}
</style>

<template>
  <ion-page>
    <ion-header>
      <ion-toolbar id="app-logo">
        <div class="py-4">
          <AppLogo class="h-6 mx-auto" />
        </div>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true" class="ion-padding">
      <div class="h-full flex items-center justify-center">
        <LoginForm />
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonContent,
  IonHeader,
  IonToolbar,
  IonPage,
} from '@ionic/vue';
import LoginForm from '../components/LoginForm.vue';
import AppLogo from '../components/MayvenLogo.vue';
import { StatusBar, Style } from '@capacitor/status-bar';
StatusBar.setStyle({ style: Style.Dark });
</script>
