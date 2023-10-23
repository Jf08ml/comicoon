<template>
  <div>
    <form @submit.prevent="submitInfo" class="details-form">
      <div class="form-group">
        <input
          placeholder="Nombre de la serie"
          type="text"
          id="serieName"
          v-model="serieInfo.name"
          required
        />
      </div>
      <div class="form-group">
        <textarea
          placeholder="Descripción"
          id="serieDescription"
          v-model="serieInfo.description"
          required
        ></textarea>
      </div>
      <div class="form-group">
        <input
          placeholder="Artista"
          type="text"
          id="serieArtist"
          v-model="serieInfo.artist"
          required
        />
      </div>
      <div class="form-group">
        <select id="contentType" v-model="serieInfo.contentType">
          <option value="" disabled>Seleccione un tipo de contenido</option>
          <option value="real">Real</option>
          <option value="animated">Animado</option>
        </select>
      </div>
      <div class="form-group keywords">
        <div class="keyword-input-container">
          <input
            placeholder="Palabras claves"
            type="text"
            v-model="newKeyword"
          />
          <button type="button" class="button-add" @click="addKeyword">
            +
          </button>
        </div>
        <div class="keywords-container">
          <div
            v-for="(keyword, index) in serieInfo.keywords"
            :key="index"
            class="keyword"
          >
            {{ keyword }}
            <span @click="removeKeyword(index)" class="remove-keyword">x</span>
          </div>
        </div>
      </div>
      <button type="submit" class="button-blue">Guardar detalles</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { toast } from "vue3-toastify";

const props = defineProps({
  userData: Object,
  originalNickname: String,
});

const serieInfo = ref({
  name: "",
  description: "",
  artist: "",
  contentType: "",
  keywords: [],
});

const emit = defineEmits(["submit-details"]);

const newKeyword = ref("");

const submitInfo = () => {
  emit("submit-details", serieInfo.value);
};

const addKeyword = () => {
  if (serieInfo.value.keywords.length >= 5) {
    toast.warning("Maximo 5 palabras clave");
  } else if (newKeyword.value.trim() && newKeyword.value != "") {
    serieInfo.value.keywords.push(newKeyword.value.trim());
    newKeyword.value = "";
  }
};

const removeKeyword = (index) => {
  serieInfo.value.keywords.splice(index, 1);
};
</script>

<style scoped>
.form-group {
}
.form-group.keywords {
  position: relative;
}
.keyword-input-container {
  position: relative;
}
.keyword-input-container input {
  padding-right: 50px;
}

.keyword-input-container .button-add {
  position: absolute;
  top: 50%;
  right: 20px;
  transform: translateY(-50%);
  border: none;
}

.button-add {
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  transition: background-color 0.3s;
  width: 1rem;
  box-shadow: 0 0 2px black;
}
.button-add:hover {
  background-color: #0056b3;
}
.keywords {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  align-items: center;
}

.keywords-container {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
}

.keyword {
  margin: 0 5px;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
  align-items: center;
  display: flex;
  width: auto;
  margin-bottom: 15px;
}

.remove-keyword {
  margin-left: 5px;
  font-size: 14px;
  color: red;
  cursor: pointer;
}
</style>
