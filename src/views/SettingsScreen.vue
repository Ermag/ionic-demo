<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>{{ t('settings') }}</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <div class="h-full grid">
        <ion-header collapse="condense">
          <ion-toolbar>
            <ion-title size="large">{{ t('settings') }}</ion-title>
          </ion-toolbar>
        </ion-header>
        <LogoutButton class="mx-auto w-11/12 justify-self-center" />
      </div>
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
import LogoutButton from '../components/LogoutButton.vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
</script>
