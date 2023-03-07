<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>{{ t('logs') }}</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large" class="mt-2">
            {{ t('logs') }}
            ({{ logs.length }})
          </ion-title>
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
import LogItems from '../components/LogItems.vue';
import { useI18n } from 'vue-i18n';
import { storeToRefs } from 'pinia';
import { useLogsStore } from '../store';

const store = useLogsStore();
const { logs } = storeToRefs(store);

const { t } = useI18n();
</script>
