<template>
  <form @submit.prevent="submitForm">
    <div>
      <input
        class="input-register-nick"
        :style="borderNicknameColor"
        placeholder="Nickname"
        type="text"
        v-model="formData.nickname"
        required
        minlength="6"
        @input="validateNickname"
      />
      <v-icon
        class="icon-register-nick"
        :name="nicknameValid.name"
        scale="1"
        :color="nicknameValid.color"
      />
    </div>
    <div>
      <input
        placeholder="Email"
        type="email"
        v-model="formData.email"
        required
      />
    </div>
    <button type="submit" class="button-primary">Save Changes</button>
  </form>
</template>

<script setup>
import { ref } from "vue";
import { searchNickname } from "@/services/auth.js";

const props = defineProps({
  userData: Object,
  originalNickname: String,
});

const formData = ref(props.userData);

const emit = defineEmits(["send-basic-information"]);

const borderNicknameColor = ref("");
const nicknameValid = { name: "si-superuser", color: "grey" };

const submitForm = () => {
  emit("send-basic-information", formData.value);
};

const validateNickname = async () => {
  if (
    props.userData.nickname.length >= 6 &&
    props.userData.nickname != props.originalNickname
  ) {
    const response = await searchNickname(props.userData.nickname);
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
</script>

<style>
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
