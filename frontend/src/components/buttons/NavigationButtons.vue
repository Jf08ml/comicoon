<template>
  <div>
    <button
      :class="getButtonClass(showBack)"
      :disabled="!showBack"
      @click="showBack && emit('back-comic')"
    >
      «
    </button>
    <button class="btn-navigation" @click="emit('open-serie')">
      <v-icon name="hi-information-circle" title="Info. Serie" />
    </button>
    <button
      :class="getButtonClass(showNext)"
      :disabled="!showNext"
      @click="showNext && emit('next-comic')"
    >
      »
    </button>
  </div>
</template>

<script setup>
const { showBack, showNext } = defineProps(["showBack", "showNext"]);
const emit = defineEmits();

const getButtonClass = (show) =>
  show ? "btn-navigation" : "btn-navigation-blocked";
</script>

<style scoped lang="scss">
%btn-navigation-base {
  border: none;
  margin: 2px;
  font-size: 20px;
  border-radius: 5px;
  cursor: pointer;
  width: 5%;
  height: 10%;
}

.btn-navigation {
  @extend %btn-navigation-base;
  background-color: #b81f59;
  color: white;
}

.btn-navigation-blocked {
  @extend %btn-navigation-base;
  background-color: #7e7e7e;
  color: rgb(252, 252, 252);
}

.btn-navigation:hover,
.btn-navigation-blocked:hover {
  box-shadow: 0 0 5px #ffffff;
}

@media screen and (max-width: 700px) {
  .btn-navigation,
  .btn-navigation-blocked {
    width: 10%;
  }
}
</style>
