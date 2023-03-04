<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-title>Login</ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content :fullscreen="true" class="ion-padding">
            <form class="login-form" @submit.prevent="submitForm">
                <ion-item lines="full">
                    <ion-label position="floating">Email</ion-label>
                    <ion-input v-model="email" type="text" required></ion-input>
                </ion-item>
                <ion-item lines="full">
                    <ion-label position="floating">Password</ion-label>
                    <ion-input v-model="password" type="password" required></ion-input>
                </ion-item>
                <div class="ion-padding ion-text-center">
                    <ion-spinner v-if="isLoading" name="circular"></ion-spinner>
                    <ion-button v-else type="submit" expand="block" :disabled="!isValid">Login</ion-button>
                </div>
            </form>
            <ion-label color="danger" class="ion-padding ion-text-center">{{ authError }}</ion-label>
        </ion-content>
    </ion-page>
</template>

<script setup lang="ts">
import {
    IonLabel,
    IonInput,
    IonSpinner,
    IonButton,
    IonItem,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonPage,
} from '@ionic/vue';
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';
import { useAuthStore } from '../store';

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
    console.log(status)
    if (status === 'success') router.replace('/tabs/home');
};
</script>
