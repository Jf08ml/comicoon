<template>
  <button
    class="btn-navigation"
    :class="{ 'btn-navigation-blocked': disabled }"
    :disabled="disabled"
    @click="onClick"
  >
    <v-icon :name="icon" :title="title" scale="1.2" color="white" />
  </button>
</template>

<script setup>
const props = defineProps({
  type: String,
  disabled: Boolean,
  title: String,
  icon: String,
});

const emit = defineEmits(["click"]);

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
