import axios from "axios";

export const API = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
  params: { api_key: "2fccde01a371b106b09a241d6d1d5b49" },
});
