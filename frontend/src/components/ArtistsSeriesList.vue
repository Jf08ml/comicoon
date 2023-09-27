<template>
  <div>
    <div class="section-artists">
      <div class="container-list-artists">
        <h3>These are the most popular artists</h3>
        <div v-for="(artist, index) in artists" :key="index" class="list-artists">
          <button class="btn-artist">{{ index + 1 }}. {{ artist.name }}</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const props = defineProps({
  params: Object
})

const artists = ref({});

onMounted(()=>{
  console.log(props.params)
  artists.value = props.params
})

</script>

<style scoped></style>