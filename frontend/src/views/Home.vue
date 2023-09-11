<template>
  <div class="container-content">
    <div class="home-sections">
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
    </div>
    <LineDivider />
    <div class="section">
      <ListSeries
        v-if="showSeries"
        :series="series"
        :page="page"
        :totalPages="totalPages"
        actionType="view"
        @prev-page="prevPage"
        @next-page="nextPage"
      />

      <div v-else class="container-primary-artists">
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
  </div>
</template>

<script setup>
import { ref, onBeforeMount } from "vue";
import LineDivider from "@/components/LineDivider.vue";
import ListSeries from "@/components/ListSeries.vue";
import { getSeriesData } from "@/services/series";

const activeBtn = ref("newer");
const type = ref("All");
const page = ref(1);
const limit = ref(10);
const totalPages = ref(0);
const series = ref({});
const showSeries = ref(false);
const artists = ref({});

onBeforeMount(async () => {
  await getSeries();
});

const handleButtonClick = (btnType) => {
  activeBtn.value = btnType;
  getSeries();
};

const getSeries = async () => {
  const response = await getSeriesData(
    type.value,
    activeBtn.value,
    page.value,
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
};

const nextPage = () => {
  if (page.value < totalPages.value) {
    page.value += 1;
    getSeries();
  }

  if (page.value === totalPages.value) {
    disabledNext.value = true;
  }
};

const prevPage = () => {
  if (page.value > 1) {
    page.value -= 1;
    getSeries();
  }
};
</script>

<style>
.container-primary-artists {
  width: 100%;
  height: 100%;
  margin: auto;
  overflow-y: auto;
  display: flex;
  align-items: center;
  justify-content: flex-start;
}

.container-list-artists {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.list-artists {
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
}

.btn-artist {
  background-color: #ffffff;
  color: rgb(0, 0, 0);
  border: none;
  margin: 5px;
  padding: 5px;
  text-align: justify;
  font-size: 20px;
  border-radius: 5px;
  cursor: pointer;
  width: 70%;
}

.btn-artist:hover {
  background-color: #b81f59;
  color: white;
}
</style>
