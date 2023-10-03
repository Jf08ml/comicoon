<template>
  <div class="floating-button">
    <button @click="showOptions = !showOptions" class="nav-button-icone">
      <v-icon name="co-options" title="Options" scale="1.2" />
    </button>
    <div v-if="showOptions" class="options-menu">
      <button>Calificar</button>
      <button>Añadir a Favoritos</button>
      <button>Comentar</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const showOptions = ref(false);
</script>

<style lang="scss" scoped>
.floating-button {
  position: fixed;
  bottom: 20px;
  right: 20px;
  background-color: #da2644;
  color: #fff;
  border: none;
  border-radius: 50%;
  padding: 16px;
  cursor: pointer;
  z-index: 1000;
  box-shadow: 0 0 5px black;

  .options-menu {
    position: absolute;
    bottom: 0px;
    right: 70px;
    width: 150px;
    background-color: #fff;
    box-shadow: 0px 0px 10px black;
    border-radius: 5px;

    button {
      display: block;
      background: none;
      border: none;
      padding: 10px;
      width: 100%;
      text-align: left;
      cursor: pointer;
      &:hover {
        background-color: #f0f0f0;
        border-radius: 5px;
      }
    }
  }
}
</style>
