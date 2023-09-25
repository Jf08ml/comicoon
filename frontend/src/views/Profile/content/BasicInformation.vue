<template>
  <div class="basic-information">
    <!-- Foto de perfil -->
    <div class="profile-picture">
      <img :src="profilePicture" alt="Profile Picture" />
      <input
        type="file"
        @change="handleProfilePictureChange"
        accept="image/*"
      />
    </div>

    <h4>Change your profile photo, username, email and password.</h4>

    <!-- Acordeón -->
    <details class="accordion-section">
      <summary>Basic information</summary>
      <form @submit.prevent="sendBasicInformation">
        <div
          style="
            width: 100%;
            position: relative;
            display: flex;
            align-items: center;
            justify-content: flex-end;
          "
        >
          <input
            class="input-register-nick"
            :style="borderNicknameColor"
            placeholder="Nickname"
            type="text"
            v-model="userData.nickname"
            required
            @input="validateNickname"
          />
          <v-icon
            class="icon-register-nick"
            :name="nicknameValid.name"
            scale="1"
            :color="nicknameValid.color"
          />
        </div>
        <input
          placeholder="Email"
          type="email"
          v-model="userData.email"
          required
        />
        <button type="submit" class="button-primary">Save Changes</button>
      </form>
    </details>

    <details class="accordion-section">
      <summary>Change password</summary>
      <form @submit.prevent="savePasswordChanges">
        <input
          placeholder="Current password"
          type="password"
          v-model="userData.currentPassword"
          required
        />
        <input
          placeholder="New password"
          type="password"
          v-model="userData.newPassword"
          required
        />
        <button type="submit" class="button-primary">Save Changes</button>
      </form>
    </details>
  </div>
</template>

<script setup>
import { ref, watch, onUnmounted } from "vue";
import { searchNickname } from "@/services/auth.js";

const props = defineProps({
  userInformation: Object,
});

const emit = defineEmits(["send-basic-information"]);

// Datos del usuario (simulados)
const userData = ref({});
const borderNicknameColor = ref("");

const nicknameValid = { name: "si-superuser", color: "grey" };

const profilePicture = ref("https://i.ibb.co/R6JfVWG/Fp-TSq7-Ga-YAAWho8.jpg");

const handleProfilePictureChange = (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      profilePicture.value = e.target.result;
    };
    reader.readAsDataURL(file);
  }
};

const sendBasicInformation = () => {
  emit("send-basic-information", userData.value);
};

const validateNickname = async () => {
  if (userData.value.nickname.length >= 6) {
    const response = await searchNickname(userData.value.nickname);
    if (response.value === true) {
      nicknameValid.name = "bi-x-circle-fill";
      nicknameValid.color = "red";
      borderNicknameColor.value =
        "border: 2px solid red; box-shadow: 0px 0px 3px red";
    }
    if (response.value === false) {
      nicknameValid.name = "bi-check-circle-fill";
      nicknameValid.color = "#afd85d";
      borderNicknameColor.value =
        "border: 2px solid #afd85d; box-shadow: 0px 0px 3px #afd85d";
    }
  } else {
    nicknameValid.name = "si-superuser";
    nicknameValid.color = "grey";
    borderNicknameColor.value = "";
  }
};

watch(
  () => props.userInformation,
  (newVal) => {
    if (newVal) {
      userData.value = newVal;
    }
  },
  { immediate: true } // Esto asegura que el watcher se ejecute inmediatamente cuando el componente se monta
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
