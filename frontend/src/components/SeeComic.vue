<template>
  <div align="center">
    <div>
      <FloatingButton />
    </div>
    <div style="display: flex; align-items: center; justify-content: center">
      <h1>{{ comic.title }}</h1>
    </div>
    <LineDivider />
    <NavigationButtons
      :showBack="showBack"
      :showNext="showNext"
      @next-comic="nextComic"
      @back-comic="backComic"
      @open-serie="openSerieInfo"
    />
    <div
      class="content-images"
      v-for="(image, index) in comic.imagesPost"
      :key="index"
    >
      <div class="loader" v-show="!imagesLoaded[index]"></div>
      <img class="img-styles" :src="image" @load="imagesLoaded[index] = true" />
    </div>

    <NavigationButtons
      :showBack="showBack"
      :showNext="showNext"
      @next-comic="nextComic"
      @back-comic="backComic"
      @open-serie="openSerieInfo"
    />
    <LineDivider />
    <div style="padding: 40px">
      <h3>Other Series</h3>
      <ListSeries
        :series="azarComics"
        actionType="view"
        @open-serie="openSerie"
      />
    </div>
  </div>
</template>

<script setup>
import { onBeforeMount, ref, watch, nextTick } from "vue";
import { useRoute } from "vue-router";
import router from "@/router";
import { getUserComic } from "@/services/comics";
import { getUserSerie, getAzarSeries } from "@/services/series";
import LineDivider from "@/components/LineDivider.vue";
import FloatingButton from "@/components/buttons/FloatingButton.vue";
import ListSeries from "@/components/ListSeries.vue";
import NavigationButtons from "./buttons/NavigationButtons.vue";

const route = useRoute();

const comic = ref({});
const serie = ref({});
const idComic = ref(route.params.id);
const azarComics = ref({});
const page = ref(null);
const showBack = ref(false);
const showNext = ref(false);
const imagesLoaded = ref();

onBeforeMount(async () => {
  await currentComic();
  await comicSerie();
  await comicList();
  pagination();
});

const currentComic = async () => {
  try {
    const response = await getUserComic(idComic.value);
    comic.value = response;
    if (comic.value.imagesPost) {
      imagesLoaded.value = comic.value.imagesPost.map(() => false);
    } else {
      imagesLoaded.value = [];
    }
  } catch (error) {
    console.error(error);
  }
};

const comicSerie = async () => {
  try {
    const response = await getUserSerie(comic.value.serie);
    serie.value = response;
    page.value = serie.value.partsSerie.indexOf(comic.value._id);
  } catch (error) {
    console.error(error);
  }
};

const comicList = async () => {
  try {
    const response = await getAzarSeries();
    azarComics.value = response;
  } catch (error) {
    console.error(error);
  }
};

const pagination = () => {
  const countPages = serie.value.partsSerie.length;
  if (page.value != 0) {
    showBack.value = true;
  } else {
    showBack.value = false;
  }
  if (page.value === countPages - 1) {
    showNext.value = false;
  } else {
    showNext.value = true;
  }
};

const nextComic = async () => {
  let pageNext = page.value + 1;
  let comicIdNext = serie.value.partsSerie[pageNext];

  router.push(`/viewcomic/${comicIdNext}`);
  await nextTick();
  pagination();
  window.scrollTo({ top: 0, behavior: "smooth" });
};

const backComic = async () => {
  let pageNext = page.value - 1;
  let comicIdNext = serie.value.partsSerie[pageNext];
  router.push(`/viewcomic/${comicIdNext}`);
  await nextTick();
  pagination();
  window.scrollTo({ top: 0, behavior: "smooth" });
};

const openSerieInfo = () => {
  let serie = comic.value.serie;

  router.push(`/viewserie/${serie}`);
  window.scrollTo({ top: 0, behavior: "smooth" });
};

const openSerie = (serie) => {
  router.push(`/viewserie/${serie._id}`);
};

watch(
  () => route.params.id,
  async (newIdComic) => {
    idComic.value = newIdComic;
    await currentComic();
    await comicSerie();
    await comicList();
    pagination();
  }
);
</script>

<style lang="scss">
.loader {
  border: 8px solid #f3f3f3;
  border-top: 8px solid #3498db;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: spin 1s linear infinite;
}

.is-hidden {
  display: none;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
