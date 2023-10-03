<template>
  <div class="container">
    <div class="header">
      <Navbar />
    </div>
    <div class="body">
      <router-view style="width: 100%; height: 100%; box-sizing: border-box" />
    </div>
    <ModalLoading v-if="isLoading"/>
  </div>
</template>

<script setup>
import { ref, onMounted, watchEffect } from "vue";
import EventBus from "./utils/eventBus";
import { useAuthStore } from "./store/auth";
import Navbar from "./layouts/Navbar/Index";
import { useLoadingStore } from "./store/loadingStore";
import ModalLoading from "@/components/modals/ModalLoading.vue";

const authStore = useAuthStore();
const loadingStore = useLoadingStore();

const isLoading = ref(loadingStore.$state.isLoading);

onMounted(() => {
  EventBus.on("logout", () => {
    authStore.logout();
  });
});

watchEffect(() => {
  isLoading.value = loadingStore.$state.isLoading;
});
</script>

<style lang="scss">
@import "@/styles/global.scss";
</style>
