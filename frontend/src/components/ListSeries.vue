<template>
  <div class="content-list-series">
    <div class="series">
      <div class="serie-item" v-for="serie in series" :key="serie._id">
        <CardDefault
          :title="serie.nameSerie"
          :description="serie.description"
          :image="serie.frontPage"
          :views="serie.views"
          @click="actionCard(serie)"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";
import CardDefault from "@/components/cards/CardsDefault.vue";

const props = defineProps({
  series: Object,
  actionType: String,
});

const emit = defineEmits(["open-serie", "selected-serie"]);
const emitOpenSerie = (id) => emit("open-serie", id);
const emitSelectedSerie = (id) => emit("selected-serie", id);

const actionCard = (serie) => {
  if (props.actionType === "view") {
    emitOpenSerie(serie);
  } else if (props.actionType === "select") {
    emitSelectedSerie(serie);
  }
};
</script>

<style scoped>
 
.content-list-series {
  display: flex;
  flex-direction: column;
  margin: auto;
  height: 100%;
  width: 100%;
}

.series {
  display: flex;
  flex-wrap: wrap;
  justify-items: center;
  gap: 2rem;
  height: auto;
  width: 100%;
  box-sizing: border-box;
}

.serie-item {
  margin: auto;
}

@media (min-width: 1200px) {
  .serie-item {
    width: calc(100% / 7); 
    height: auto; 
  }
}


@media (min-width: 768px) and (max-width: 1199px) {
  .serie-item {
    width: calc(100% / 4); 
    height: auto; 
  }
}


@media (max-width: 767px) {
  .serie-item {
    width: calc(100% / 2.3); 
    height: auto; 
  }
}

</style>
