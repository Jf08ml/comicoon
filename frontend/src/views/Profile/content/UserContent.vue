<template>
  <div class="container-content">
    <div class="content-sections">
      <div class="container-content">
        <transition name="fade" mode="out-in">
          <div v-if="showCard1" class="card">
            <h4>1. Upload content</h4>
            <FormUploadImages
              @handle-upload="handleUpload"
              @view-imgs="viewImgs"
              :uploadedImages="uploadedImages"
              :fileInput="fileInput"
            />
          </div>
        </transition>

        <transition name="fade" mode="out-in">
          <div v-if="showCard2" class="card">
            <h4>2. Información de la serie</h4>
            <FormInfoSerie @submit-details="submitDetails" />
          </div>
        </transition>

        <transition name="fade" mode="out-in">
          <div v-if="showCard3" class="card">
            <h4>3. Ver y publicar</h4>
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
            <SeeComic />
          </div>
        </transition>
      </div>

      <div class="view-section section">
        <h4>Published series</h4>
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
import axios from "axios";
import FormUploadImages from "../forms/UploadImages.vue";
import FormInfoSerie from "../forms/InfoSerie.vue";
import ListSeries from "@/components/ListSeries.vue";
import Pagination from "@/components/Pagination.vue";
import SeeComic from "@/components/SeeComic.vue";
import router from "@/router";
import {
  getUserSeries,
  postSerie,
  putComicInSerie,
} from "@/services/series.js";
import { comicPost } from "@/services/comics";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
import { useLoadingStore } from "@/store/loadingStore.js";

const useLoading = useLoadingStore();

const userSeries = ref([]);
const currentPage = ref(1);
const limit = ref(6);
const totalPages = ref(0);

const fileInput = ref(null);
const uploadedImages = ref([]);

const serieDetails = ref({});

const comicOfSerie = ref({});
const newKeyword = ref("");
const showCard1 = ref(true);
const showCard2 = ref(false);
const showCard3 = ref(false);

const urlImageSend = ref([]);

onBeforeMount(async () => {
  await getSeries();
});

const viewImgs = (files) => {
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const objectURL = URL.createObjectURL(file);
    uploadedImages.value.push({
      name: file.name,
      preview: objectURL,
      imagefile: file,
    });
  }
};

const handleUpload = (files) => {
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
        };
      };
      reader.readAsDataURL(file);
    });
    moveToCard2();
  }
};

const moveToCard1 = () => {
  showCard3.value = false;
  showCard1.value = true;
  uploadedImages.value = [];

  serieDetails.value = {};

  comicOfSerie.value = {};
  newKeyword.value = "";
};

const moveToCard2 = () => {
  showCard1.value = false;
  showCard2.value = true;
};

const moveToCard3 = () => {
  showCard2.value = false;
  showCard3.value = true;
};

const submitDetails = (serieInfo) => {
  serieDetails.value = serieInfo;
  moveToCard3();
};

const postSerieBd = async () => {
  try {
    const response = await postSerie(serieDetails.value);
    comicOfSerie.value.serie = response.serie_id;

    if (response.result === "success") {
      await postComic();
    }
  } catch (error) {
    console.error(error);
  }
};

const postComic = async () => {
  try {
    const response = await comicPost(comicOfSerie.value);
    const comicLoaded = response.comic;

    if (response.result === "success") {
      await insertComicInSerie(comicLoaded);
    } else {
      toast.error(response.message);
    }
  } catch (error) {
    console.error(error);
  }
};

const insertComicInSerie = async (comicLoaded) => {
  try {
    const response = await putComicInSerie(comicLoaded);
    if (response.result === "success") {
      toast.success(response.message);
      await getSeries();
    }
  } catch (error) {
    console.error(error);
  }
};

const publishSerie = async () => {
  useLoading.show();
  for (let i = 0; i < uploadedImages.value.length; i++) {
    const formData = new FormData();
    formData.append("image", uploadedImages.value[i].imagefile);
    formData.append("key", "0f13a40a6bc24a6565e327d5b4b5e26c");
    const response = await axios.post(
      "https://api.imgbb.com/1/upload",
      formData
    );
    let userPhotoUrl = response.data.data.url;
    urlImageSend.value.push(userPhotoUrl);
  }

  comicOfSerie.value = {
    name: serieDetails.value.name,
    imagesPost: urlImageSend.value,
    serie: "",
  };

  await postSerieBd();
  moveToCard1();
  useLoading.hide();
};

const getSeries = async () => {
  try {
    const response = await getUserSeries(currentPage.value, limit.value);
    userSeries.value = response.series;
    totalPages.value = response.totalCount;
  } catch (error) {
    console.error(error);
  }
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

  .thumbnail {
    width: 80px;
    height: 80px;
  }
}
</style>
