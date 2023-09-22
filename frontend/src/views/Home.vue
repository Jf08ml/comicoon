<template>
  <div class="container-content">
    <section class="home-sections">
      <div>
        <button
          class="button-options"
          :class="{ 'button-options-active': activeBtn === 'artists' }"
          @click="handleButtonClick('artists')"
        >
          Featured artists
        </button>
      </div>
      <div>
        <button
          class="button-options"
          :class="{ 'button-options-active': activeBtn === 'newer' }"
          @click="handleButtonClick('newer')"
        >
          Most news
        </button>
      </div>
      <div>
        <button
          class="button-options"
          :class="{ 'button-options-active': activeBtn === 'mostviews' }"
          @click="handleButtonClick('mostviews')"
        >
          Most views
        </button>
      </div>
      <div>
        <button
          class="button-options"
          :class="{ 'button-options-active': activeBtn === 'popular' }"
          @click="handleButtonClick('popular')"
        >
          Popular series
        </button>
      </div>
    </section>
    <LineDivider />
    <div class="section">
      <div v-if="showSeries" class="section-series">
        <ListSeries
          :series="series"
          actionType="view"
          @open-serie="openSerie"
        />
        <Pagination
          :currentPage="currentPage"
          :totalPages="totalPages"
          @prev-page="updatePage(currentPage - 1)"
          @jump-prev-page="updatePage(currentPage - 5)"
          @selected-page="updatePage"
          @next-page="updatePage(currentPage + 1)"
          @jump-next-page="updatePage(currentPage + 5)"
        />
      </div>

      <div v-else class="section-artists">
        <div class="container-list-artists">
          <h3>These are the most popular artists</h3>
          <div
            v-for="(artist, index) in artists"
            :key="index"
            class="list-artists"
          >
            <button class="btn-artist">
              {{ index + 1 }}. {{ artist.name }}
            </button>
          </div>
        </div>
      </div>
    </div>
    <ModalLoading v-show="showModal" />
  </div>
</template>

<script setup>
import { ref, onBeforeMount } from "vue";
import LineDivider from "@/components/LineDivider.vue";
import ModalLoading from "@/components/modals/ModalLoading.vue";
import ListSeries from "@/components/ListSeries.vue";
import Pagination from "@/components/Pagination.vue";
import { getSeriesData } from "@/services/series";
import router from "@/router";

const activeBtn = ref("newer");
const type = ref("All");
const currentPage = ref(1);
const limit = ref(24);
const totalPages = ref(0);
const series = ref({});
const showSeries = ref(false);
const showModal = ref(false);
const artists = ref({});

onBeforeMount(async () => {
  await getSeries();
});

const handleButtonClick = (btnType) => {
  activeBtn.value = btnType;
  getSeries();
};

const getSeries = async () => {
  showModal.value = true;
  const response = await getSeriesData(
    type.value,
    activeBtn.value,
    currentPage.value,
    limit.value,
    totalPages.value
  );

  if (
    activeBtn.value === "popular" ||
    activeBtn.value === "mostviews" ||
    activeBtn.value === "newer"
  ) {
    series.value = response.series;
    totalPages.value = response.totalCount;
    showSeries.value = true;
  } else if (activeBtn.value === "artists") {
    artists.value = response.top10Artists;
    showSeries.value = false;
  }
  showModal.value = false;
};

const updatePage = async (page) => {
  currentPage.value = page;
  await getSeries();
};

const openSerie = (serie) => {
  router.push(`/viewserie/${serie._id}`);
};
</script>

<style></style>
