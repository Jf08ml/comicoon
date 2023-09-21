<template>
  <div class="navbar-brand">
    <router-link class="custom-router-link" :to="{ name: 'home' }" v-slot="{ navigate }">
      <button @click="navigate" class="nav-button">
        <v-icon name="si-gitbook" scale="1.5" title="Comicoon" /> Comicoon
      </button>
    </router-link>
  </div>
</template>

<script setup></script>

<style></style>
