<template>
  <div class="nav-link-usersession">
    <div class="nav-link-usersession">
      <div>
        <router-link custom :to="{ name: 'Upload' }">
          <template v-slot="{ navigate }">
            <button class="nav-button-menu-logout" @click="navigate">
              <v-icon
                name="pr-upload"
                scale="1.2"
                title="Upload serie or comic"
              />
            </button>
          </template>
        </router-link>
      </div>
      <div>
        <button @click="logOut()" class="nav-button-menu-logout">
          <v-icon name="co-account-logout" scale="1.2" title="Log Out" />
        </button>
      </div>
    </div>
    <div style="display: flex; justify-content: center; align-items: center;">
      <router-link custom :to="{ name: 'profile' }">
        <template v-slot="{ navigate }">
          <button
            class="profile-pic"
            :style="profilePicStyle"
            @click="navigate"
          >
            <v-icon
              name="ri-account-pin-circle-fill"
              scale="1.7"
              title="Profile"
              :color="colorIcone"
            />
          </button>
        </template>
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useAuthStore } from "@/store/auth";

const authStore = useAuthStore();

const userUrlPhoto = computed(() => authStore.userImgProfile);
const colorIcone = computed(() =>
  userUrlPhoto.value ? "transparent" : "white"
);

const profilePicStyle = computed(() => ({
  backgroundImage: userUrlPhoto.value ? `url(${userUrlPhoto.value})` : "",
  backgroundSize: "cover",
  backgroundPosition: "center",
  boxShadow: "0 0 2px black",
}));

const logOut = () => {
  authStore.logout();
};
</script>

<style scoped>

.profile-pic {
  width: 50px;
  height:  50px;
  border-radius: 50%;
  border: solid 0.5px #ffffff;
  background: none;
  cursor: pointer;
  overflow: hidden;
}

</style>
