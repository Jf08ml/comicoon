import { apiComics } from "./api.js";

export async function comicPost(postComplete, token) {
  try {
    const response = await apiComics.post(
      `/postcomic`,
      {
        postComplete,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    return await Promise.reject(error.response.data);
  }
}

export async function getUserComics(token) {
  try {
    const response = await apiComics.get(`/usercomics`, {
      headers: {
        "Cache-Control": "no-cache",
        Authorization: `${token}`,
      },
    });
    return response.data;
  } catch (error) {
    return await Promise.reject(error.response.data);
  }
}

export async function getUserComic(id, token) {
  try {
    const response = await apiComics.get(`/usercomic/${id}`, {
      headers: {
        "Cache-Control": "no-cache",
        Authorization: `${token}`,
      },
    });
    return response.data;
  } catch (error) {
    return await Promise.reject(error.response.data);
  }
}

export async function putComic(comicLoaded, token) {
  try {
    const response = await apiComics.put(
      `/putcomic`,
      {
        comicLoaded,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    return await Promise.reject(error.response.data);
  }
}

export async function postRateComic(comicId, rate, token) {
  try {
    const response = await apiComics.post(
      `/rateComic`,
      {
        rate,
        comicId,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    return await Promise.reject(error.response.data);
  }
}

export async function assignScoreComic(comicId, token) {
  try {
    const response = await apiComics.put(
      `/assignScore`,
      {
        comicId,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    return await Promise.reject(error.response.data);
  }
}

export async function countViewsComic(comicId, token) {
  try {
    const response = await apiComics.put(
      `/sumView`,
      {
        comicId,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    return await Promise.reject(error.response.data);
  }
}
