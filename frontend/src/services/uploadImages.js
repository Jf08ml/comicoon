import axios from "axios";
import { useLoadingStore } from "@/store/loadingStore.js";

const useLoading = useLoadingStore();

async function base64ToBlob(base64) {
  const response = await fetch(base64);
  const blob = await response.blob();
  return blob;
}

export async function uploadImagesBase64(base64String) {
  try {
    useLoading.show();

    // Convierte la cadena base64 en un objeto blob
    const blob = await base64ToBlob(base64String);

    // Usa FormData para enviar el archivo
    const formData = new FormData();
    formData.append("image", blob, "image.png");
    formData.append("key", "70ab458cc599c4e941b44dc5aa63c282");

    const response = await axios.post(
      "https://api.imgbb.com/1/upload",
      formData
    );

    return response.data.data.url;
  } catch (error) {
    return await Promise.reject(error.response ? error.response.data : error);
  } finally {
    useLoading.hide();
  }
}

export async function uploadImagesFile(file) {
  try {
    useLoading.show();

    const formData = new FormData();
    formData.append("image", file);
    formData.append("key", "70ab458cc599c4e941b44dc5aa63c282");
    const response = await axios.post(
      "https://api.imgbb.com/1/upload",
      formData
    );
    return response.data.data.url;
  } catch (error) {
    return await Promise.reject(error.response ? error.response.data : error);
  } finally {
    useLoading.hide();
  }
}
