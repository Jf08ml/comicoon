<template>
  <button
    class="btn-navigation"
    :class="{ 'btn-navigation-blocked': disabled }"
    :disabled="disabled"
    @click="onClick"
    :style="{ color: textColor }"
  >
    <v-icon :name="icon" :title="title" scale="1.2" :color="textColor" />
  </button>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  type: String,
  disabled: Boolean,
  title: String,
  icon: String,
  backgroundColor: String,
});

const emit = defineEmits(["click"]);

const textColor = computed(() => {
  const bgColor = props.backgroundColor || "#FFFFFF"; // Asumiendo blanco por defecto
  const r = parseInt(bgColor.slice(1, 3), 16);
  const g = parseInt(bgColor.slice(3, 5), 16);
  const b = parseInt(bgColor.slice(5, 7), 16);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.5 ? "black" : "white";
});

const onClick = () => {
  emit("click", props.type);
};
</script>

<style lang="scss" scoped>
.btn-navigation {
  background-color: transparent;
  color: white;
  border: none;
  margin: 2px;
  border-radius: 50%;
  cursor: pointer;

  &:hover {
    background-color: #da2644;
  }
}

.btn-navigation-blocked {
  background-color: transparent;
  color: rgb(252, 252, 252);
  border: none;
  margin: 2px;
  border-radius: 50%;
  cursor: pointer;

  &:hover {
    background-color: #7e7e7e;
  }
}
</style>
