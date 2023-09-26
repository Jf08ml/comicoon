<template>
  <div class="buttons-navigation">
    <button
      class="btn-navigation"
      @click="emitJumpPrevPage"
      :disabled="currentPage <= 5"
      :class="{ 'btn-navigation-blocked': currentPage <= 5 }"
    >
      <v-icon
        name="md-skipprevious"
        title="Options"
        scale="1.2"
        color="white"
      />
    </button>
    <button
      class="btn-navigation"
      @click="emitPrevPage"
      :disabled="currentPage === 1"
      :class="{ 'btn-navigation-blocked': currentPage === 1 }"
    >
      <v-icon
        name="md-navigatebefore"
        title="Options"
        scale="1.2"
        color="white"
      />
    </button>
    <div v-for="buttonPage in visiblePages" :key="buttonPage">
      <button
        class="buttons-page"
        @click="emitSelectedPage(buttonPage)"
        :class="{ 'buttons-page-active': buttonPage === currentPage }"
      >
        {{ buttonPage }}
      </button>
    </div>
    <button
      class="btn-navigation"
      @click="emitNextPage"
      :disabled="currentPage === totalPages"
      :class="{ 'btn-navigation-blocked': currentPage === totalPages }"
    >
      <v-icon
        name="md-navigatenext"
        title="Options"
        scale="1.2"
        color="white"
      />
    </button>
    <button
      class="btn-navigation"
      @click="emitJumpNextPage"
      :disabled="currentPage >= totalPages - 4"
      :class="{ 'btn-navigation-blocked': currentPage >= totalPages - 4 }"
    >
      <v-icon name="md-skipnext" title="Options" scale="1.2" color="white" />
    </button>
  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  currentPage: Number,
  totalPages: Number,
});

const emit = defineEmits([
  "prev-page",
  "jump-prev-page",
  "selected-page",
  "next-page",
  "jump-next-page",
]);

const visiblePageCount = 5;

const visiblePages = computed(() => {
  const startPage = Math.max(
    1,
    props.currentPage - Math.floor(visiblePageCount / 2)
  );
  const endPage = Math.min(props.totalPages, startPage + visiblePageCount - 1);
  return Array.from(
    { length: endPage - startPage + 1 },
    (_, i) => i + startPage
  );
});

const emitNextPage = () => emit("next-page");
const emitJumpNextPage = () =>
  emit("jump-next-page", Math.min(props.currentPage + 5, props.totalPages));
const emitSelectedPage = (buttonPage) => emit("selected-page", buttonPage);
const emitPrevPage = () => emit("prev-page");
const emitJumpPrevPage = () =>
  emit("jump-prev-page", Math.max(1, props.currentPage - 5));
</script>

<style lang="scss">
.buttons-navigation {
  height: auto;
  width: 80%;
  margin: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.buttons-page {
  background-color: transparent;
  color: white;
  border: 1px solid grey;
  margin: 2px;
  font-size: 20px;
  border-radius: 50%;
  padding-inline: 10px;
  cursor: pointer;
}

.buttons-page-active {
  background-color: #da2644;
  color: white;
  border: 1px solid #da2644;
  margin: 2px;
  border-radius: 50%;
  padding-inline: 10px;
  cursor: pointer;
}

.btn-navigation {
  background-color: #da2644;
  color: white;
  border: none;
  margin: 2px;
  border-radius: 50%;
  cursor: pointer;
}

.btn-navigation-blocked {
  background-color: #7e7e7e;
  color: rgb(252, 252, 252);
  border: none;
  margin: 2px;
  border-radius: 50%;
  cursor: pointer;
}
</style>
