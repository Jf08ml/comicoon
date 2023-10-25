<template>
  <div class="basic-information">
    <div class="profile-picture">
      <img
        :src="profilePicture ? profilePicture : notProfilePicture"
        alt="Profile Picture"
      />
      <button @click="showModal">
        <v-icon
          name="md-addphotoalternate-round"
          title="Upload photo"
          scale="1.2"
        ></v-icon>
      </button>
    </div>
    <UploadProfilePhoto
      v-if="showCropperModal"
      @show-modal="showModal"
      @change-profile-photo="changeProfilePhoto"
    />

    <h4>Change your profile photo, username, email and password.</h4>

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
import { ref, watch } from "vue";
import { useAuthStore } from "@/store/auth.js";
import { updateProfilePhoto } from "@/services/auth";
import { uploadImagesBase64 } from "@/services/uploadImages";
import { toast } from "vue3-toastify";
import BasicInformation from "../forms/BasicInformation.vue";
import ChangePassword from "../forms/ChangePassword.vue";
import UploadProfilePhoto from "@/components/modals/UploadProfilePhoto.vue";

const props = defineProps({
  userInformation: Object,
});

const emit = defineEmits([
  "on-submit-basic-information",
  "update-password-user",
  "get-user-data",
]);

const useAuth = useAuthStore();

const showCropperModal = ref(false);

const showModal = () => {
  showCropperModal.value = !showCropperModal.value;
};

const profilePicture = ref("");
const notProfilePicture = ref("/no-profile-photo.jpg");
const userData = ref({});
const originalNickname = ref("");

const changeProfilePhoto = async (base64String) => {
  try {
    const responseImg = await uploadImagesBase64(base64String);
    const response = await updateProfilePhoto(responseImg);
    useAuth.userImgProfile = responseImg;
    if (response.result === "success") {
      toast.success(response.message);
      emit("get-user-data");
      showModal();
    }
  } catch (error) {
    console.error(error);
  }
};

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
      originalNickname.value = userData.value.nickname;
      profilePicture.value = userData.value.userUrlPhoto;
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
  position: relative;
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

.profile-picture button {
  position: absolute;
  bottom: 5%;
  right: 42%;
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  border: none;
  border-radius: 50%;
  padding: 8px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.profile-picture button:hover {
  background-color: rgba(0, 0, 0, 0.85);
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
