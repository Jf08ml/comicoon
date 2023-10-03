<template>
  <div class="card">
    <img :src="image" alt="Card image" class="card-img-top" />
    <div class="content-text">
      <h4>{{ title }}</h4>
    </div>
  </div>
</template>

<script setup>
const { image, title } = defineProps(["image", "title"]);
</script>

<style scoped>

.card {
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 250px;
  background: #333;
  transition: transform 0.3s;
}

.card:hover {
  transform: scale(1.05);
}

.card-img-top {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s;
}

.card:hover .card-img-top {
  transform: scale(1.1);
}

.content-text {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 50px; 
  background: rgba(0, 0, 0, 0.5);
  text-align: center;
  opacity: 0;
  transition: opacity 0.3s;
  display: flex;
  align-items: center;
  justify-content: center; 
}

.card:hover .content-text {
  opacity: 1;
}

h4 {
  padding: 2px;
  margin: 0px;
  color: aliceblue;
  font-size: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis; 
  max-width: 90%;
}


@media (max-width: 600px) {
  .content-text {
    opacity: 1;
  }

  h4 {
    font-size: 0.7rem;
  }
}

</style>
