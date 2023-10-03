<template>
  <div class="container-auth">
    <div class="content">
      <div class="content-title">
        <h1>Log in</h1>
      </div>

      <div class="content-form">
        <form @submit.prevent="onSubmit">
          <div class="form-div-input">
            <input
              class="input-form"
              v-model="identifier"
              placeholder="Email or nickname"
              type="text"
              required
            />
          </div>
          <p v-if="identifier == ''" style="color: red">
            Este campo es requerido
          </p>

          <div class="form-div-input">
            <input
              class="input-form"
              v-model="password"
              placeholder="Password"
              type="password"
              required
            />
          </div>
          <p v-if="password == ''" style="color: red; margin-bottom: 8px">
            Este campo es requerido
          </p>

          <router-link to="/recuperar">
            <span>¿Olvidaste tu contraseña?</span>
          </router-link>

          <p v-if="showMsgError" style="color: red; margin-top: 5px">
            {{ showMsgError }}
          </p>

          <button type="submit" class="button-primary">Login</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { login, getUser } from "@/services/auth.js";

const router = useRouter();

const identifier = ref("chikimalvin@gmail.com");
const password = ref("Diana.123");
const showMsgError = ref("");

const onSubmit = async () => {
  try {
    await login(identifier.value, password.value);
    await getUser();
    router.push("/");
  } catch (error) {
    if (error.result === "errorPassword") {
      showMsgError.value = "Email o contraseña incorrecta";
    } else if (error.result === "errorNotFound") {
      showMsgError.value = "No existe un usuario registrado";
    }
    console.error(error);
  }
};
</script>

<style lang="scss"></style>
