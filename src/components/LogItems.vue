<style scoped>
  .log-title {
    font-size: 14px;
    white-space: normal;
  }
  .log-date {
    font-size: 13px;
    color: var(--ion-color-medium);
  }
</style>

<template>
  <div v-if="!logs.length" class="ion-padding ion-text-center">
        <ion-label>{{ t('messages.noLogs') }}</ion-label>
      </div>
      <ion-list v-else>
        <ion-item v-for="(log, i) in logs" :key="i">
          <ion-label>
            <div class="log-title">{{ log.label }}</div>
          </ion-label>
          <p class="log-date">{{ formatTimestamp(log.timestamp) }}</p>
        </ion-item>
      </ion-list>
</template>

<script setup lang="ts">
  import {
    IonList,
    IonItem,
    IonLabel
  } from '@ionic/vue';
  import { format } from 'date-fns'
  import { storeToRefs } from 'pinia';
  import { useLogsStore } from '../store';
  import { useI18n } from 'vue-i18n';

  const { t } = useI18n();
  const store = useLogsStore();
  const { logs } = storeToRefs(store);
  const formatTimestamp = (timestamp: number) => {
    return format(timestamp, 'yyyy-MM-dd HH:mm:ss')
  }
</script>
