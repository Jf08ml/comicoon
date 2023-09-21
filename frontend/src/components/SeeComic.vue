<template>
  <div align="center">
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
    <div style="display: flex; align-items: center; justify-content: center">
      <h1>{{ comic.title }}</h1>
    </div>
    <LineDivider />
    <div
      class="content-images"
      v-for="(image, index) in comic.imagesPost"
      :key="index"
    >
      <div>
        <img class="img-styles" :src="image" />
      </div>
    </div>
    <LineDivider />
  </div>
</template>

<script setup>
import { onBeforeMount, ref, watch } from "vue";
import { useRoute } from "vue-router";
import { getUserComic } from "@/services/comics";
import { getUserSerie } from "@/services/series";
import LineDivider from "@/components/LineDivider.vue";
const route = useRoute();

const comic = ref({});
const serie = ref({});
const idComic = route.params;
const page = ref();

const showOptions = ref(false);

onBeforeMount(async () => {
  try {
    const response = await getUserComic(idComic.id);
    comic.value = response;
  } catch (error) {
    console.error(error);
  }
  try {
    const response = await getUserSerie(comic.value.serie);
    serie.value = response;
  } catch (error) {
    console.error(error);
  }
});

watch(
  () => route.params.id,
  async (newIdComic) => {
    idComic.value = newIdComic;
    try {
      const response = await getUserComic(idComic.value);
      comic.value = response;
    } catch (error) {
      console.error(error);
    }

    try {
      const response = await getUserSerie(comic.value.serie);
      serie.value = response;
      page.value = serie.value.partsSerie.indexOf(comic.value._id);
    } catch (error) {
      console.error(error);
    }
  }
);
</script>

<style lang="scss">
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
