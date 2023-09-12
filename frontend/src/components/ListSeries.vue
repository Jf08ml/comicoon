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
    <div class="buttons-navigation">
      <button
        class="btn-navigation"
        @click="emitPrevPage"
        :disabled="page === 1"
        :class="{ 'btn-navigation-blocked': page === 1 }"
      >
        «
      </button>
      <span
        style="
          margin-inline: 5px;
          color: whitesmoke;
          text-shadow: 0 0 5px black;
          -webkit-text-stroke: 1px rgb(129, 114, 114); /* Para navegadores basados en Webkit como Chrome y Safari */
        "
        >Página {{ page }} de {{ totalPages }}</span
      >

      <button
        class="btn-navigation"
        @click="emitNextPage"
        :disabled="page === totalPages"
        :class="{ 'btn-navigation-blocked': page === totalPages }"
      >
        »
      </button>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";
import CardDefault from "@/components/cards/CardsDefault.vue";

const props = defineProps({
  series: Object,
  page: Number,
  totalPages: Number,
  actionType: String,
});

const emit = defineEmits([
  "prev-page",
  "next-page",
  "open-serie",
  "selected-serie",
]);

const emitNextPage = () => emit("next-page");
const emitPrevPage = () => emit("prev-page");
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
  width: auto;
}
.series {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  height: 80%;
  width: 100%;
  box-sizing: border-box;
}
.serie-item {
  width: 10%;
  height: 250px;
  margin: 0;
}


.buttons-navigation {
  height: 20%;
  margin-block: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.btn-navigation {
  background-color: #da2644;
  color: white;
  border: none;
  margin: 2px;
  font-size: 20px;
  border-radius: 5px;
  cursor: pointer;
  width: 5%;
  height: 10%;
}

.btn-navigation-blocked {
  background-color: #7e7e7e;
  color: rgb(252, 252, 252);
  border: none;
  margin: 2px;
  font-size: 20px;
  border-radius: 5px;
  cursor: pointer;
  width: 5%;
  height: 10%;
}
</style>
