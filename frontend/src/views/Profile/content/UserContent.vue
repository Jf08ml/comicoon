<template>
  <div class="container-content">
    <div class="content-sections">
      <div class="upload-section section">
        <h4>Upload content</h4>
        <!-- Formulario de carga -->
        <form @submit.prevent="handleUpload" class="upload-form">
          <input type="file" ref="fileInput" class="file-input" />
          <button type="submit" class="upload-button">Upload</button>
        </form>
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

const fileInput = ref(null);
const uploadedItems = ref([]);
const userSeries = ref([]);
const currentPage = ref(1);
const limit = ref(6);
const totalPages = ref(0);

onBeforeMount(async () => {
  await getSeries();
});

const getSeries = async () => {
  try {
    const response = await getUserSeries(currentPage.value, limit.value);
    userSeries.value = response.series;
    totalPages.value = response.totalCount;
  } catch (error) {}
};

const handleUpload = () => {
  const file = fileInput.value?.files[0];
  if (file) {
    uploadedItems.value.push({
      name: file.name,
    });
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

.upload-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 50%;
}

.file-input {
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.upload-button {
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  background-color: #008cba;
  color: #fff;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #005f5f;
  }
}

.uploaded-items-list {
  list-style-type: none;
  padding: 0;
}

.uploaded-item {
  background-color: #f1f1f1;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
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
