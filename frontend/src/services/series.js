import { apiSeries } from "./api.js";

// const BASE_URL = "http://localhost:3000/api/comic";
// const BASE_URL = 'http://192.168.101.13:3000/api/comic'

export async function seriePost(serie, token) {
  try {
    const response = await apiSeries.post(
      `/postserie`,
      {
        serie,
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

export async function getUserSeries(page, limit, token) {
  try {
    const response = await apiSeries.get(
      `/userseries?page=${page}&limit=${limit}`,
      {
        headers: {
          "Cache-Control": "no-cache",
          Authorization: `${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    return await Promise.reject(error.response.data);
  }
}

export async function getUserSerie(id, token) {
  try {
    const response = await apiSeries.get(`/userserie/${id}`, {
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

export async function assignScoreSerie(serieId, token) {
  try {
    const response = await apiSeries.put(
      `/assignScoreSerie`,
      {
        serieId,
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

export async function countViewsSerie(serieId, token) {
  try {
    const response = await apiSeries.put(
      `/sumViewSerie`,
      {
        serieId,
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

export async function getSeriesData(type, queryType, page, limit) {
  try {
    const response = await apiSeries.get(
      `/seriesData/${type}/${queryType}?page=${page}&limit=${limit}`,
      {
        headers: {
          "Cache-Control": "no-cache",
        },
      }
    );
    return response.data;
  } catch (error) {
    return await Promise.reject(error.response.data);
  }
}

export async function getArtistSeries(artist, page, limit) {
  try {
    const response = await apiSeries.get(
      `/artistSeries/${artist}?page=${page}&limit=${limit}`,
      {
        headers: {
          "Cache-Control": "no-cache",
        },
      }
    );
    return response.data;
  } catch (error) {
    return await Promise.reject(error.response.data);
  }
}

export async function searchSerie(nameSerie, page, limit) {
  try {
    const response = await apiSeries.get(
      `/searchSeries/${nameSerie}?page=${page}&limit=${limit}`,
      {
        headers: {
          "Cache-Control": "no-cache",
        },
      }
    );
    return response.data;
  } catch (error) {
    return await Promise.reject(error.response.data);
  }
}

export async function getSeriesToInscribe(page, limit, token) {
  try {
    const response = await apiSeries.get(
      `/seriestoinscribe?page=${page}&limit=${limit}`,
      {
        headers: {
          "Cache-Control": "no-cache",
          Authorization: `${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    return await Promise.reject(error.response.data);
  }
}

export async function enteredSeries(serie, token) {
  try {
    const response = await apiSeries.put(
      `/enteredseries/${serie}`,
      {},
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
