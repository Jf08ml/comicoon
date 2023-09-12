<template>
  <div class="container">
    <div class="header">
      <Navbar />
    </div>
    <div class="body">
      <router-view style="width: 100%; height: 100%; box-sizing: border-box;"/>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import EventBus from "./utils/eventBus";
import { useAuthStore } from "./store/auth";
import Navbar from "./layouts/Navbar/Index";

const authStore = useAuthStore();

onMounted(() => {
  EventBus.on("logout", () => {
    authStore.logout();
  });
});
</script>

<style lang="scss">
@import "@/styles/global.scss"
</style>
