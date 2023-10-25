<template>
  <div class="modal">
    <div class="modal-content">
      <h4>Upload and edit profile photo</h4>
      <LineDivider />

      <div>
        <input
          style="margin: auto"
          ref="input"
          type="file"
          accept="image/*"
          @change="setImage"
        />
      </div>

      <div v-if="editComplete">
        <div v-if="imageToDisplay">
          <vue-cropper
            ref="cropper"
            :aspect-ratio="10 / 9"
            :src="imageSelected"
            class="my-cropper"
          />

          <p v-if="!cropApplied" style="color: red; text-align: center">
            Es necesario recortar la imagen antes de cargarla.
          </p>
        </div>
      </div>

      <div v-else>
        <img :src="imageToDisplay" />
      </div>

      <div v-if="imageToDisplay">
        <button @click="applyCrop" class="button-blue">Aplicar Recorte</button>
        <button @click="resetImage" class="button-blue">
          Restablecer Imagen
        </button>
      </div>

      <LineDivider />

      <div style="display: flex; width: 50%; margin: auto">
        <button @click="closeModal" class="button-primary-cancel">
          Cancelar
        </button>
        <button
          @click="uploadPhoto"
          :disabled="!cropApplied"
          class="button-primary"
        >
          Cargar
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, nextTick } from "vue";
import VueCropper from "vue-cropperjs";
import "cropperjs/dist/cropper.css";
import LineDivider from "../LineDivider.vue";

const emit = defineEmits(["show-modal", "change-profile-photo"]);

const input = ref(null);
const cropper = ref(null);

const editComplete = ref(true);

const imageSelected = ref(null);
const imageToDisplay = ref(null);

const cropApplied = ref(false);

const setImage = (e) => {
  const file = e.target.files[0];

  if (file.type.indexOf("image/") === -1) {
    alert("Please select an image file");
    return;
  }

  if (typeof FileReader === "function") {
    const reader = new FileReader();

    reader.onload = async (event) => {
      imageSelected.value = event.target.result;
      imageToDisplay.value = event.target.result;

      await nextTick();

      if (cropper.value) {
        cropper.value.replace(event.target.result);
      } else {
        console.error("cropperRef is still null");
      }
    };

    reader.readAsDataURL(file);
  } else {
    alert("Sorry, FileReader API not supported");
  }
};

const applyCrop = () => {
  if (cropper.value) {
    const croppedImageDataURL = cropper.value.getCroppedCanvas().toDataURL();
    imageToDisplay.value = croppedImageDataURL;
    cropper.value.replace(imageToDisplay.value);
    cropApplied.value = true;
  }
  editComplete.value = false;
};

const resetImage = () => {
  imageToDisplay.value = imageSelected.value;
  if (cropper.value) {
    cropper.value.replace(imageSelected.value);
    cropApplied.value = false;
  }
  editComplete.value = true;
};

const closeModal = () => {
  emit("show-modal");
};

const MAX_WIDTH = 800; // Puedes ajustar este valor según tus necesidades

const uploadPhoto = () => {
  const img = new Image();
  img.onload = () => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    // Calculamos las nuevas dimensiones
    const ratio = MAX_WIDTH / img.width;
    canvas.width = img.width * ratio;
    canvas.height = img.height * ratio;

    // Dibujamos la imagen en el canvas con las nuevas dimensiones
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

    // Convertimos el canvas a DataURL
    const scaledImageDataURL = canvas.toDataURL("image/png");
    imageToDisplay.value = scaledImageDataURL;

    // Emite el evento con la imagen escalada
    emit("change-profile-photo", scaledImageDataURL);
  };

  img.src = imageToDisplay.value;
};
</script>

<style scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7); /* Oscurecer un poco más el fondo */
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: "Arial", sans-serif;
}
.my-cropper {
  margin: auto;
  max-width: 100%; /* Ajusta este valor según tus necesidades */
  max-height: 400px; /* Ajusta este valor según tus necesidades */
}

.modal-content {
  background-color: white;
  border-radius: 15px;
  width: 85%;
  max-width: 900px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
}

.modal-content div {
  margin-bottom: 15px;
  margin-top: 15px;
}

input[type="file"] {
  padding: 10px;
  border: 1px solid #d1d1d1;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.2s;
  width: 70%;
}

input[type="file"]:hover {
  background-color: #f7f7f7;
}

img {
  max-width: 100%;
  display: block;
  margin: 0 auto;
  border-radius: 5px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
</style>
