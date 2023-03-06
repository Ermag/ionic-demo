<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>{{ t('login') }}</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true" class="ion-padding">
      <LoginForm />
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
  import {
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonPage,
  } from '@ionic/vue';
  import LoginForm from '../components/LoginForm.vue';
  import { useI18n } from 'vue-i18n';

  const { t } = useI18n();
</script>
