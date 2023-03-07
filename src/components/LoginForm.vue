<style scoped>
ion-item {
  --padding-start: 6px;
  --padding-end: 6px;
}
</style>

<template>
  <form @submit.prevent="submitForm">
    <h2 class="mb-6 text-center text-3xl">
      {{ t('messages.signIn') }}
    </h2>
    <ion-item :class="inputFormClass(email, isEmailValid)" fill="outline">
      <ion-label position="floating">{{ t('email') }}</ion-label>
      <ion-input v-model="email" type="email" required autofocus></ion-input>
      <ion-note slot="helper">&nbsp;</ion-note>
      <ion-note slot="error">{{ t('errors.invalidPassword') }}</ion-note>
    </ion-item>
    <ion-item :class="inputFormClass(password, isPasswordValid)" fill="outline">
      <ion-label position="floating">{{ t('password') }}</ion-label>
      <ion-input v-model="password" type="password" required></ion-input>
      <ion-note slot="helper">&nbsp;</ion-note>
      <ion-note slot="error">{{ t('errors.invalidEmail') }}</ion-note>
    </ion-item>
    <div class="text-center py-4">
      <ion-spinner v-if="isLoading" name="circular"></ion-spinner>
      <ion-button v-else type="submit" class="text-xl" expand="block" :disabled="!isFormValid">
        {{ t('login') }}
      </ion-button>
    </div>
    <ion-label color="danger" class="ion-padding ion-text-center">{{ authError ? t(authError) : '' }}</ion-label>
  </form>
</template>
  
<script setup lang="ts">
import {
  IonLabel,
  IonNote,
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

// Basic input validation
const isEmailInputValid = (email: string) => {
  return email.match(/^(?=.{1,254}$)(?=.{1,64}@)[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/);
}
const isEmailValid = computed(() => {
  const value = email.value.trim();
  return Boolean(isEmailInputValid(value));
});
const isPasswordValid = computed(() => {
  const value = password.value.trim();
  return Boolean(value.length);
});
const isFormValid = computed(() => {
  return isEmailValid.value && isPasswordValid.value;
});
const inputFormClass = (value: string, isValid: boolean) => {
  if (value === '') return;
  return isValid ? 'ion-valid' : 'ion-invalid';
};

const submitForm = async () => {
  if (!isFormValid.value) {
    return false;
  }
  isLoading.value = true;
  const { status } = await login(email.value, password.value);
  isLoading.value = false;
  if (status === 'success') router.replace('/tabs/home');
};
</script>
