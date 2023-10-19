<template>
  <div class="menu-hamburger">
    <div class="nav-link-usersession" v-if="authStore.isAuthenticated">
      <UserSession />
    </div>
    <div class="hamburger-icon" @click="toggleMenu">
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

        <router-link custom to="/realcomics">
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
            <div style="text-align: right">
              <v-icon
                name="fa-person-booth"
                scale="1.2"
                title="Real Comics"
                color="#da2644"
              />
            </div>

              <div style="text-align: left">
                Real
              </div>
            </button>
          </template>
        </router-link>

        <router-link custom to="/animatedcomics">
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
              <v-icon
                name="si-gitbook"
                scale="1.5"
                title="Real Comics"
                color="#da2644"
              />
              Animated
            </button>
          </template>
        </router-link>
        <router-link custom to="/earnmoney">
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
              <v-icon
                name="gi-take-my-money"
                scale="1.5"
                title="Earn money"
                color="#da2644"
              />
              Earn money
            </button>
          </template>
        </router-link>
        <router-link custom to="/login" v-if="!authStore.token">
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
              <v-icon
                name="md-login"
                scale="1.2"
                title="Real Comics"
                color="#da2644"
              />
              Log In
            </button>
          </template>
        </router-link>
        <router-link custom to="/signup" v-if="!authStore.token">
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
              <v-icon
                name="md-newlabel-twotone"
                scale="1.2"
                title="Real Comics"
                color="#da2644"
              />
              Sign Up
            </button>
          </template>
        </router-link>

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
            <div style="text-align: right">
              <v-icon
                :name="e.iconName"
                scale="1.2"
                title="Real Comics"
                color="#da2644"
              />
            </div>

              <div style="text-align: left">
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

const authStore = useAuthStore();
const isOpen = ref(false);

const toggleMenu = () => {
  isOpen.value = !isOpen.value;
};


const menuObjects = [{
  titleMenu: "Real",
  iconName: "fa-person-booth",
  routeButton: "/realcomics",
}];



</script>

<style>
.menu-icon {
  transition: all 1s;
  animation: fadeMenu 0.5s;
}

@keyframes fadeMenu {
    0% {
        transform: scale(0.1);
    }

    50%{
      transform: scale(1.2);
    }

    100%{
      transform: scale(1);
    }
}

</style>
