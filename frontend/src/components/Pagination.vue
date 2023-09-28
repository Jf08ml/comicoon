<template>
  <div class="buttons-navigation">
    <div style="display: flex; width: 100%; justify-content: center">
      <div v-for="buttonPage in visiblePages" :key="buttonPage">
        <button
          class="buttons-page"
          @click="emitSelectedPage(buttonPage)"
          :class="{ 'buttons-page-active': buttonPage === currentPage }"
        >
          {{ buttonPage }}
        </button>
      </div>
    </div>
    <div style="display: flex; width: 100%; justify-content: center">
      <NavigationButton
        v-for="button in navigationButtons"
        :key="button.type"
        :type="button.type"
        :disabled="button.disabled"
        :title="button.title"
        :icon="button.icon"
        @click="button.action"
      />
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import NavigationButton from "./buttons/NavigationButton.vue"; // Asegúrate de usar la ruta correcta al componente

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

// Definición de las páginas visibles
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

// Definición de los botones de navegación
const navigationButtons = computed(() => [
  {
    type: "jump-prev-page",
    disabled: props.currentPage <= 5,
    title: "Jump to Previous Page",
    icon: "md-skipprevious",
    action: emitJumpPrevPage,
  },
  {
    type: "prev-page",
    disabled: props.currentPage === 1,
    title: "Previous Page",
    icon: "md-navigatebefore",
    action: emitPrevPage,
  },
  {
    type: "next-page",
    disabled: props.currentPage === props.totalPages,
    title: "Next Page",
    icon: "md-navigatenext",
    action: emitNextPage,
  },
  {
    type: "jump-next-page",
    disabled: props.currentPage >= props.totalPages - 4,
    title: "Jump to Next Page",
    icon: "md-skipnext",
    action: emitJumpNextPage,
  },
]);

// Métodos de emisión para los eventos de navegación
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
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.buttons-page {
  background-color: transparent;
  color: white;
  border: none;
  border-bottom: 1px solid grey;
  margin: 2px;
  font-size: 15px;
  padding-inline: 10px;
  cursor: pointer;
}

.buttons-page-active {
  background-color: transparent;
  color: white;
  border: none;
  border-bottom: 3px solid #da2644;
  margin: 2px;
  padding-inline: 10px;
  cursor: pointer;
}
</style>
