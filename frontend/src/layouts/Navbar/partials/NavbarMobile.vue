<template>
  <div class="menu-hamburger">
    <div class="nav-link-usersession" v-if="authStore.isAuthenticated">
      <UserSession />
    </div>
    <div class="hamburger-icon" @click="toggleMenu" >
      <v-icon
        :class="{ 'menu-icon': !isOpen }"
        v-if="!isOpen"
        name="ri-menu-fill"
        scale="2"
        title="Menu"
        color="white"
      />
      <v-icon
        :class="{ 'menu-icon': isOpen }"
        v-if="isOpen"
        name="md-close-sharp"
        scale="2"
        title="Menu"
        color="white"
      />
    </div>

    <div class="menu" :style="{ display: isOpen ? 'block' : 'none' }">
      <div class="menu-open">
        <div v-for="(e, index) in menuObjects" :key="index">
          <router-link custom :to="e.routeButton">
            <template v-slot="{ navigate }">
              <button
                @click="
                  () => {
                    navigate();
                    isOpen = false;
                  }
                "
                class="nav-link-mobile"
              >
              <div class="iconMobileNavBar">
                <v-icon
                  :name="e.iconName"
                  scale="1.2"
                  title="Real Comics"
                  color="#da2644"
                />
              </div>

                <div class="titleMobileNavBar">
                  {{ e.titleMenu }}
                </div>
              </button>
            </template>
          </router-link>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref } from "vue";
import { useAuthStore } from "@/store/auth";
import UserSession from "./UserSession.vue";
import menuObjectService from "../../../services/menuService";

const authStore = useAuthStore();
const isOpen = ref(false);
const menuObjects = ref([]);

const toggleMenu = () => {
  isOpen.value = !isOpen.value;
};

menuObjects.value = menuObjectService;

</script>

<style>
.menu-icon {
  transition: all 0.5s;
  animation: fadeMenu 0.5s ease-in-out;
}

@keyframes fadeMenu {
    0% {
        transform: scale(1);
    }

    25%{
      transform: scale(0.1);
    }

    50%{
      transform: scale(1.5);
    }

    100%{
      transform: scale(1);
    }
}

</style>
