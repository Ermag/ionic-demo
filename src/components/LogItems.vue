<template>
  <div v-if="!logs.length" class="ion-padding ion-text-center">
    <ion-label>{{ t('messages.noLogs') }}</ion-label>
  </div>
  <div v-else class="mx-auto w-11/12">
    <div v-for="(log, i) in logs" :key="i" class="p-3 bg-white drop-shadow-md rounded-lg my-4">
      <div class="text-gray-500 text-xs">{{ formatTimestamp(log.timestamp) }}</div>
      <div class="text-sm">{{ log.label }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { IonLabel } from '@ionic/vue';
import { format } from 'date-fns';
import { storeToRefs } from 'pinia';
import { useLogsStore } from '../store';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const store = useLogsStore();
const { logs } = storeToRefs(store);
const formatTimestamp = (timestamp: number) => {
  return format(timestamp, 'yyyy-MM-dd HH:mm:ss');
}
</script>
