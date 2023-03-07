<style scoped>
ion-tab-bar {
  position: fixed;
  bottom: var(--ion-nav-offset);
  left: var(--ion-nav-offset);
  width: calc(100% - 2 * var(--ion-nav-offset));
  --background: #fff;
}
</style>

<template>
  <ion-tab-bar slot="bottom" class="h-14 border-gray-100 border-2 shadow-xl rounded-full overflow-hidden">
    <ion-tab-button tab="tab1" href="/tabs/home">
      <ion-icon aria-hidden="true" :icon="play" />
      <ion-label>{{ t('liveFeed') }}</ion-label>
    </ion-tab-button>

    <ion-tab-button tab="tab2" href="/tabs/logs">
      <ion-icon aria-hidden="true" :icon="fileTrayFull" />
      <ion-label>{{ t('logs') }}</ion-label>
    </ion-tab-button>

    <ion-tab-button tab="tab3" href="/tabs/settings">
      <ion-icon aria-hidden="true" :icon="settings" />
      <ion-label>{{ t('settings') }}</ion-label>
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
import { play, fileTrayFull, settings } from 'ionicons/icons';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
</script>
