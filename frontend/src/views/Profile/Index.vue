<template>
  <div class="profile">
    <h1 class="profile-title">User Profile</h1>
    <section class="profile-section">
      <div
        class="section"
        :class="{ 'active-section': activeSection === 'BasicInformation' }"
        @click="changeSection('BasicInformation')"
      >
        User Information
      </div>
      <div
        class="section"
        :class="{ 'active-section': activeSection === 'PaymentInformation' }"
        @click="changeSection('PaymentInformation')"
      >
        Payments
      </div>
      <div
        class="section"
        :class="{ 'active-section': activeSection === 'ContentStatistics' }"
        @click="changeSection('ContentStatistics')"
      >
        Content Statistics
      </div>
      <div
        class="section"
        :class="{ 'active-section': activeSection === 'Contents' }"
        @click="changeSection('Contents')"
      >
        Content Options
      </div>
    </section>
    <div class="profile-content-section">
      <UserInformation
        :userInformation="userBasicInformation"
        @on-submit-basic-information="onSubmitBasicInformation"
        @update-password-user="updatePasswordUser"
        @get-user-data="getUserData"
        v-if="activeSection === 'BasicInformation'"
      />
      <UserContent v-if="activeSection === 'Contents'" />
    </div>
  </div>
</template>

<script setup>
import { ref, onBeforeMount } from "vue";
import UserInformation from "./content/UserInformation.vue";
import UserContent from "./content/UserContent.vue";
import { getUser, updateUser, updatePassword } from "@/services/auth.js";
import { useRoute } from "vue-router";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

const userBasicInformation = ref();
const route = useRoute();

onBeforeMount(async () => {
  await getUserData();
});

const activeSection = ref(route.params.activeSection || "BasicInformation");

const changeSection = (section) => {
  activeSection.value = section;
};

const getUserData = async () => {
  try {
    const response = await getUser();
    userBasicInformation.value = response.user;
  } catch (error) {
    console.error(error);
  }
};

const onSubmitBasicInformation = async (userInformation) => {
  try {
    const res = await updateUser(userInformation);
    await getUserData();

    toast.success(res.message);
  } catch (error) {
    console.log(error);

    toast.error(error.message);
  }
};

const updatePasswordUser = async (dataPassword) => {
  try {
    const res = await updatePassword(dataPassword);

    toast.success(res.message);
  } catch (error) {
    console.error(error);

    toast.error(error.message);
  }
};
</script>

<style scoped>
.profile {
  font-family: "system-ui", -apple-system, BlinkMacSystemFont, "Segoe UI",
    Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  padding: 20px;
  background-color: #f5f5f5;
  text-align: center;
}

.profile-title {
  font-size: 24px;
  color: #333;
  margin-bottom: 20px;
}

.profile-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.section {
  flex: 1;
  height: 20px;
  border: 1px solid #ddd;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s ease-in-out;
  cursor: pointer;
  overflow: hidden; /* Evita desbordamientos */
  text-overflow: ellipsis; /* Agrega puntos suspensivos en el texto que no cabe */
}

.section:hover {
  background-color: #da2644;
  color: #fff;
}

.active-section {
  background-color: #da2644;
  color: #fff;
  font-weight: bold;
}

.profile-content-section {
  padding: 20px;
  background-color: #fff;
  border: 1px solid #ddd;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

@media (max-width: 768px) {
  .profile {
    padding: 5px;
  }
  .section {
    font-size: 13px;
  }
}
</style>
