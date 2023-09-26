import { apiAuth } from "./api.js";
import { useAuthStore } from "../store/auth.js";
import { useLoadingStore } from "@/store/loadingStore";
import Cookies from "js-cookie";

const useAuth = useAuthStore();
const useLoading = useLoadingStore();

export async function login(identifier, password) {
  try {
    useLoading.show();

    const response = await apiAuth.post(
      `/login`,
      {
        identifier,
        password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    useAuth.token = response.data.token;
    useAuth.refreshTokenUser = response.data.refreshToken;
    Cookies.set("accessToken", useAuth.token, { sameSite: "strict" });
    Cookies.set("refreshToken", useAuth.refreshTokenUser, {
      sameSite: "strict",
    });

    return response.data;
  } catch (error) {
    return await Promise.reject(error.response.data);
  } finally {
    useLoading.hide();
  }
}

export async function signup(nickname, email, password) {
  try {
    const response = await apiAuth.post(
      `/signup`,
      {
        nickname,
        email,
        password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    useAuth.token = response.data.token;
    useAuth.refreshTokenUser = response.data.refreshToken;
    Cookies.set("accessToken", useAuth.token, { sameSite: "strict" });
    Cookies.set("refreshToken", useAuth.refreshTokenUser, {
      sameSite: "strict",
    });

    return response.data;
  } catch (error) {
    return await Promise.reject(error.response.data);
  }
}

export async function getUser() {
  try {
    useLoading.show();

    const token = useAuthStore().token;
    const response = await apiAuth.get(`/getuser`, {
      headers: {
        "Cache-Control": "no-cache",
        Authorization: token,
      },
    });
    return response.data;
  } catch (error) {
    return await Promise.reject(error.response.data);
  } finally {
    useLoading.hide();
  }
}

export async function searchNickname(nickname) {
  try {
    const response = await apiAuth.get(`/searchnickname/${nickname}`, {
      headers: {
        "Cache-Control": "no-cache",
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Error service");
  }
}

export async function updateUser(userData) {
  try {
    const token = useAuthStore().token;
    const response = await apiAuth.put(`/updateuser`, userData, {
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });
    return response.data;
  } catch (error) {
    return await Promise.reject(error.response.data);
  }
}

export async function updatePassword(passwords) {
  try {
    const token = useAuthStore().token;
    const response = await apiAuth.put(`/updatepassword`, passwords, {
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });
    return response.data;
  } catch (error) {
    return await Promise.reject(error.response.data);
  }
}

export async function updateProfilePhoto(userPhotoUrl, token) {
  try {
    const response = await apiAuth.put(`/updateprofilephoto`, userPhotoUrl, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error("Error al actualizar los datos del usuario");
  }
}
