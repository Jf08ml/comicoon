<template>
  <div>
    <form @submit.prevent="emitUploadEvent" class="upload-form">
      <input
        type="file"
        ref="fileInput"
        class="file-input"
        multiple
        accept="image/*"
        @input="emitViewImgsEvent"
      />
      <button type="submit" class="button-blue">Upload</button>
    </form>
    <div class="thumbnails-section">
      <div v-for="image in uploadedImages" :key="image.name" class="thumbnail">
        <img
          :src="image.preview"
          alt="Image thumbnail"
          class="thumbnail-image"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { defineProps, defineEmits } from "vue";

const props = defineProps(["uploadedImages"]);
const emit = defineEmits(["handle-upload", "view-imgs"]);

const fileInput = ref(null);

const emitUploadEvent = () => {
  const files = fileInput.value.files;
  emit("handle-upload", files);
};

const emitViewImgsEvent = () => {
  const files = fileInput.value.files;
  emit("view-imgs", files);
};
</script>

<style scoped>
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
  justify-content: center;
  flex-wrap: wrap;
  gap: 5px;
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
  object-fit: cover;
  margin: auto;
}
</style>
