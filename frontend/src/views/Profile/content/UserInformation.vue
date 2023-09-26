<template>
  <div class="basic-information">
    <!-- Foto de perfil -->
    <div class="profile-picture">
      <img :src="profilePicture" alt="Profile Picture" />
      <input type="file" accept="image/*" />
    </div>

    <h4>Change your profile photo, username, email and password.</h4>

    <!-- Acordeón -->
    <details class="accordion-section">
      <summary>Basic information</summary>
      <BasicInformation
        :userData="userData"
        :originalNickname="originalNickname"
        @send-basic-information="sendBasicInformation"
      />
    </details>

    <details class="accordion-section">
      <summary>Change password</summary>
      <ChangePassword @send-new-password="sendNewPassword" />
    </details>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from "vue";
import BasicInformation from "../forms/BasicInformation.vue";
import ChangePassword from "../forms/ChangePassword.vue";

const props = defineProps({
  userInformation: Object,
});

const emit = defineEmits([
  "on-submit-basic-information",
  "update-password-user",
]);

const profilePicture = ref("");
const userData = ref({});
const originalNickname = ref("");

onMounted(() => {
  originalNickname.value = userData.value.nickname;
  profilePicture.value = userData.value.userUrlPhoto;
});

const sendBasicInformation = (dataUser) => {
  emit("on-submit-basic-information", dataUser);
};

const sendNewPassword = (dataPassword) => {
  emit("update-password-user", dataPassword);
};

watch(
  () => props.userInformation,
  (newVal) => {
    if (newVal) {
      userData.value = newVal;
    }
  },
  { immediate: true }
);
</script>

<style scoped>
.basic-information {
  padding: 20px;
}

h2 {
  font-size: 24px;
  margin-bottom: 20px;
}

.profile-picture {
  text-align: center;
  margin-bottom: 20px;
}

.profile-picture img {
  max-width: 200px;
  max-height: 200px;
  border-radius: 50%;
  box-shadow: 0 0 1px black;
  object-fit: cover;
}

.profile-picture input[type="file"] {
  display: none;
}

.accordion-section {
  border-bottom: 1px solid #ccc;
  margin-bottom: 1rem;
}

.accordion-section summary {
  cursor: pointer;
  font-weight: bold;
  padding: 1rem;
  background-color: #f9f9f9;
}

.accordion-section form {
  padding: 1rem;
}

form {
  width: 50%;
}

form button {
  width: 30%;
}

form div {
  width: 100%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

@media screen and (max-width: 800px) {
  .basic-information {
    padding: 5px;
  }
  form {
    width: 100%;
  }

  form button {
    width: 50%;
  }
}
</style>
