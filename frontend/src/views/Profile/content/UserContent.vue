<template>
  <div class="container-content">
    <div class="content-sections">
      <div class="container-content">
        <transition name="fade" mode="out-in">
          <div v-if="showCard1" class="card">
            <h4>Upload content</h4>
            <form @submit.prevent="handleUpload" class="upload-form">
              <input
                type="file"
                ref="fileInput"
                class="file-input"
                multiple
                accept="image/*"
                @input="viewImgs"
              />
              <button type="submit" class="button-blue">Upload</button>
            </form>
            <div class="thumbnails-section">
              <div
                v-for="image in uploadedImages"
                :key="image.name"
                class="thumbnail"
              >
                <img
                  :src="image.preview"
                  alt="Image thumbnail"
                  class="thumbnail-image"
                />
              </div>
            </div>
          </div>
        </transition>

        <transition name="fade" mode="out-in">
          <div v-if="showCard2" class="card">
            <h4>Detalles de la serie</h4>
            <form @submit.prevent="submitDetails" class="details-form">
              <div class="form-group">
                <input
                  placeholder="Nombre de la serie"
                  type="text"
                  id="serieName"
                  v-model="serieDetails.name"
                  required
                />
              </div>
              <div class="form-group">
                <textarea
                  placeholder="Descripción"
                  id="serieDescription"
                  v-model="serieDetails.description"
                  required
                ></textarea>
              </div>
              <div class="form-group">
                <input
                  placeholder="Artista"
                  type="text"
                  id="serieArtist"
                  v-model="serieDetails.artist"
                  required
                />
              </div>
              <div class="form-group">
                <select id="contentType" v-model="serieDetails.contentType">
                  <option value="" disabled>
                    Seleccione un tipo de contenido
                  </option>
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
                <div
                  v-for="(keyword, index) in serieDetails.keywords"
                  :key="index"
                  class="keyword-chip"
                >
                  {{ keyword }}
                  <span @click="removeKeyword(index)" class="remove-keyword"
                    >x</span
                  >
                </div>
              </div>
              <button type="submit" class="button-blue">
                Guardar detalles
              </button>
            </form>
          </div>
        </transition>

        <transition name="fade" mode="out-in">
          <div v-if="showCard3" class="card">
            <h4>Vista previa</h4>
            <div class="preview-content">
              <h5>{{ serieDetails.name }}</h5>
              <div class="preview-thumbnails">
                <div
                  v-for="image in uploadedImages"
                  :key="image.name"
                  class="thumbnail"
                >
                  <img
                    :src="image.preview"
                    alt="Image thumbnail"
                    class="thumbnail-image"
                  />
                </div>
              </div>
              <button @click="publishSerie" class="button-blue">
                Publicar Serie
              </button>
            </div>
          </div>
        </transition>
      </div>

      <div class="view-section section">
        <h4>Uploaded content</h4>
        <ListSeries
          :series="userSeries"
          actionType="view"
          @open-serie="openSerie"
        />
        <Pagination
          :currentPage="currentPage"
          :totalPages="totalPages"
          @prev-page="updatePage(currentPage - 1)"
          @jump-prev-page="updatePage(currentPage - 5)"
          @selected-page="updatePage"
          @next-page="updatePage(currentPage + 1)"
          @jump-next-page="updatePage(currentPage + 5)"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onBeforeMount } from "vue";
import ListSeries from "@/components/ListSeries.vue";
import Pagination from "@/components/Pagination.vue";
import router from "@/router";
import { getUserSeries } from "@/services/series.js";

const userSeries = ref([]);
const currentPage = ref(1);
const limit = ref(6);
const totalPages = ref(0);

const fileInput = ref(null);
const uploadedImages = ref([]);

const serieDetails = ref({
  name: "",
  description: "",
  artist: "",
  contentType: "", 
  keywords: ['Prueba', 'Pagination', 'Componente'],
});
const newKeyword = ref("");
const showCard1 = ref(false);
const showCard2 = ref(true);
const showCard3 = ref(false);

onBeforeMount(async () => {
  await getSeries();
});

const viewImgs = () => {
  const files = fileInput.value.files;
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const objectURL = URL.createObjectURL(file);
    uploadedImages.value.push({ name: file.name, preview: objectURL });
  }
};

const handleUpload = () => {
  const files = fileInput.value.files;
  if (files && files.length > 0) {
    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onload = async (event) => {
        const img = new Image();
        img.src = event.target.result;

        img.onload = async () => {
          const elem = document.createElement("canvas");
          const ctx = elem.getContext("2d");
          const MAX_WIDTH = 400;
          const scaleFactor = MAX_WIDTH / img.width;
          elem.width = MAX_WIDTH;
          elem.height = img.height * scaleFactor;

          ctx.drawImage(img, 0, 0, elem.width, elem.height);

          const dataURL = elem.toDataURL(file.type);
          uploadedImages.value.push({
            name: file.name,
            preview: dataURL,
          });
        };
      };
      reader.readAsDataURL(file);
    });
    moveToCard2();
  }
};

const addKeyword = () => {
  if (newKeyword.value.trim()) {
    serieDetails.value.keywords.push(newKeyword.value.trim());
    newKeyword.value = "";
  }
};

const removeKeyword = (index) => {
  serieDetails.value.keywords.splice(index, 1);
};

const moveToCard2 = () => {
  showCard1.value = false;
  showCard2.value = true;
};

const moveToCard3 = () => {
  showCard2.value = false;
  showCard3.value = true;
};

const submitDetails = () => {
  console.log("Serie Details:", serieDetails.value);
  console.log("Uploaded Images:", uploadedImages.value);
  moveToCard3();
};

const publishSerie = () => {};
const getSeries = async () => {
  try {
    const response = await getUserSeries(currentPage.value, limit.value);
    userSeries.value = response.series;
    totalPages.value = response.totalCount;
  } catch (error) {}
};

const updatePage = async (page) => {
  currentPage.value = page;
  await getSeries();
};

const openSerie = (serie) => {
  router.push(`/viewserie/${serie._id}`);
};
</script>

<style lang="scss" scoped>
.content-sections {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 20px;
  width: 100%;
}

.section {
  display: flex;
  flex-direction: column;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  width: 100%;
}

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
.upload-form {
  display: flex;
  gap: 10px;
  align-items: center;
}
.file-input {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}
.thumbnails-section {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 20px;
}
.thumbnail {
  width: 100px;
  height: 100px;
  overflow: hidden;
  border-radius: 5px;
  border: 1px solid #ccc;
}
.thumbnail-image {
  width: 100%;
  height: auto;
}
.details-form-section {
  margin-top: 30px;
}
.keywords {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  align-items: center;
}
.keyword-chip {
  display: flex;
  flex-flow: row wrap;
  gap: 5px;
  align-items: center;

}
.remove-keyword {
  cursor: pointer;
  color: red;
}
.preview-section {
  margin-top: 40px;
  border-top: 1px solid #ccc;
  padding-top: 20px;
}
.preview-thumbnails {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  margin-top: 10px;
}
.card {
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 600px;
  margin: 40px auto;
  transition: transform 0.3s, opacity 0.3s;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

// Media Query para diseño responsivo
@media (max-width: 768px) {
  .content-sections {
    gap: 10px;
  }

  .section {
    padding: 10px;
  }

  h4 {
    font-size: 16px;
    margin-bottom: 10px;
  }
}
</style>
