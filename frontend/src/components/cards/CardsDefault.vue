<template>
  <div class="card">
    <img :src="props.image" alt="Card image" class="card-img-top" />
    <div class="content-text">
      <h4>{{ props.title }}</h4>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from "vue";
const props = defineProps({
  image: String,
  title: String,
});
</script>

<style scoped>
.card {
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 100%;
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
  height: 50px; /* Altura fija para el contenedor del título */
  background: rgba(0, 0, 0, 0.5); /* Sombreado semitransparente */
  text-align: center;
  opacity: 0;
  transition: opacity 0.3s;
  display: flex;
  align-items: center; /* Centra verticalmente el título */
  justify-content: center; /* Centra horizontalmente el título */
}

.card:hover .content-text {
  opacity: 1;
}

h4 {
  padding: 2px;
  margin: 0px;
  color: aliceblue;
  font-size: 100%;
  white-space: nowrap; /* Evita que el texto se rompa en varias líneas */
  overflow: hidden; /* Oculta el texto que desborde el contenedor */
  text-overflow: ellipsis; /* Añade puntos suspensivos al final del texto si es demasiado extenso */
  max-width: 90%; /* Limita el ancho del título para que no desborde el contenedor */
}

/* En dispositivos móviles, muestra el título por defecto y ajusta el tamaño del texto */
@media (max-width: 600px) {
  .content-text {
    opacity: 1;
  }

  h4 {
    font-size: 0.7rem;
  }
}
</style>
