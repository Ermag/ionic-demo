<template>
  <ion-page>
    <ion-tabs>
      <ion-router-outlet />
      
      <MainNavigation />
    </ion-tabs>
  </ion-page>
</template>

<script setup lang="ts">
  import {
    IonTabs, 
    IonPage, 
    IonRouterOutlet 
  } from '@ionic/vue';
  import MainNavigation from '../components/MainNavigation.vue';
</script>
