<template>
  <nav class="navbar">
    <div class="navbar-icone">
      <SiteLogo />
    </div>

    <div class="navbar-sections">
      <div class="navbar-sections-public">
        <PublicSection />
      </div>

      <div class="navbar-sections-user">
        <AuthOptions />
      </div>
    </div>

    <div class="menu-mobil">
      <NavbarMobile />
    </div>
  </nav>
</template>

<script setup>
import SiteLogo from "./partials/SiteLogo.vue"
import PublicSection from "./partials/PublicSection.vue";
import AuthOptions from "./partials/AuthOptions.vue";
import NavbarMobile from "./partials/NavbarMobile.vue";
</script>

<style lang="scss">

</style>
