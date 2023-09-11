<template>
  <div class="navbar-brand">
    <router-link class="custom-router-link" :to="{ name: 'home' }" v-slot="{ navigate }">
      <button @click="navigate" class="nav-button">
        <v-icon name="si-gitbook" scale="1.5" title="Real Comics" /> Comicoon
      </button>
    </router-link>
  </div>
</template>

<script setup></script>

<style></style>
