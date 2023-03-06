<template>
  <div class="ion-padding ion-text-center">
    <ion-button expand="block" @click="doLogout">{{ t('logout') }}</ion-button>
  </div>
</template>
    
<script setup lang="ts">
  import { IonButton } from '@ionic/vue';
  import { useRouter } from 'vue-router';
  import { useAuthStore } from '../store';
  import { useI18n } from 'vue-i18n';

  const { t } = useI18n();
  const store = useAuthStore();
  const router = useRouter();
  const { logout } = store;

  const doLogout = () => {
      logout();
      router.replace('/login');
  };
</script>
