import axios from "axios";
import { cancelTokens, requestWithRetry } from "../helpers/apiHelpers";

const api = axios.create({
  baseURL: "https://api.jikan.moe/v4",
  timeout: 10000
});

export const fetchAnimeList = async (
  query: Record<string, any> = {}
): Promise<any> => {
  return requestWithRetry("animeList", () => api.get("/anime", { params: query, cancelToken: cancelTokens.get("animeList")?.token }).then((res) => {
    if (!res.data?.data) {
      throw new Error("Invalid API response data structure.");
    }
    return res.data;
  }));
};

export const fetchAnimeDetailsApi = async (id: string) => {
  const key = `animeDetails_${id}`;

  return requestWithRetry(`animeDetails_${id}`, () => api.get(`/anime/${id}/full`, { cancelToken: cancelTokens.get(key)?.token }).then((res) => {
    if (!res.data?.data) {
      throw new Error("Invalid API response data structure.");
    }
    return res.data;
  }));
};

export const fetchMultipleAnimeByIdsApi = async (
  query: Record<string, any> = {}
): Promise<any> => {
  return requestWithRetry("animeMultipleIds", () => api.get("/anime", { params: query, cancelToken: cancelTokens.get("animeMultipleIds")?.token }).then((res) => {
    if (!res.data?.data) {
      throw new Error("Invalid API response data structure.");
    }
    return res.data;
  }));
}