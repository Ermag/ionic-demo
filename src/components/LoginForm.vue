<template>
  <form class="login-form" @submit.prevent="submitForm">
    <ion-item lines="full">
      <ion-label position="floating">{{ t('email') }}</ion-label>
      <ion-input v-model="email" type="text" required></ion-input>
    </ion-item>
    <ion-item lines="full">
      <ion-label position="floating">{{ t('password') }}</ion-label>
      <ion-input v-model="password" type="password" required></ion-input>
    </ion-item>
    <div class="ion-padding ion-text-center">
      <ion-spinner v-if="isLoading" name="circular"></ion-spinner>
      <ion-button v-else type="submit" expand="block" :disabled="!isValid">{{ t('login') }}</ion-button>
    </div>
    <ion-label color="danger" class="ion-padding ion-text-center">{{ authError ? t(authError) : '' }}</ion-label>
  </form>
</template>
  
<script setup lang="ts">
  import {
    IonLabel,
    IonInput,
    IonSpinner,
    IonButton,
    IonItem,
  } from '@ionic/vue';
  import { ref, computed } from 'vue';
  import { useRouter } from 'vue-router';
  import { storeToRefs } from 'pinia';
  import { useAuthStore } from '../store';
  import { useI18n } from 'vue-i18n';

  const { t } = useI18n();
  const store = useAuthStore();
  const router = useRouter();
  const { login } = store;

  const email = ref('');
  const password = ref('');
  const isLoading = ref(false);
  const { authError } = storeToRefs(store);

  // Basic validation
  const isValid = computed(() => {
    return email.value.trim() !== '' && password.value.trim() !== '';
  });

  const submitForm = async () => {
    if (!isValid.value) {
      return false;
    }

    isLoading.value = true;
    const { status } = await login(email.value, password.value);
    isLoading.value = false;
    if (status === 'success') router.replace('/tabs/home');
  };
</script>
