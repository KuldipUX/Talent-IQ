import axiosInstance from "../lib/axios.js";

export const problemApi = {
  getProblems: async (params = {}) => {
    const response = await axiosInstance.get("/problem", { params });
    return response.data;
  },

  getProblemBySlug: async (slug) => {
    const response = await axiosInstance.get(`/problem/${slug}`);
    return response.data;
  },

  getProblemByTitle: async (title) => {
    const response = await axiosInstance.get(`/problem/title/${encodeURIComponent(title)}`);
    return response.data;
  },
};
