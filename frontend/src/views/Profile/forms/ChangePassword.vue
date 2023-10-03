<template>
  <form @submit.prevent="submitForm">
    <div>
      <input
        placeholder="Current password"
        type="password"
        v-model="dataPassword.currentPassword"
        required
        minlength="6"
      />
    </div>
    <div>
      <input
        placeholder="New password"
        type="password"
        v-model="dataPassword.newPassword"
        required
        minlength="6"
      />
    </div>
    <button type="submit" class="button-primary">Save Changes</button>
  </form>
</template>

<script setup>
import { ref } from "vue";

const emit = defineEmits(["send-new-password"]);

const dataPassword = ref({
  currentPassword: "",
  newPassword: "",
});

const submitForm = () => {
  emit("send-new-password", dataPassword.value);
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
