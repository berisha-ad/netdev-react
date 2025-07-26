import axios from "axios";
import { API_URL } from "./config";

export const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  xsrfCookieName: "XSRF-TOKEN",
  xsrfHeaderName: "X-XSRF-TOKEN",
});

export const getCookie = (name: string): string | null => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(";").shift() || null;
  return null;
};

export const getCsrfToken = async () => {
  try {
    await api.get("/sanctum/csrf-cookie");
    const encoded = getCookie("XSRF-TOKEN");
    return decodeURIComponent(encoded || "");
  } catch (error) {
    console.error("Error fetching CSRF token:", error);
  }
};
