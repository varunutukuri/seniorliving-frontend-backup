import axios from "axios";

const API_BASE = import.meta.env.VITE_API_URL || "/api";

const api = axios.create({
  baseURL: API_BASE,
  headers: { "Content-Type": "application/json" },
});

// ── Request interceptor: attach access token ──
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ── Response interceptor: auto-refresh on 401 ──
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) prom.reject(error);
    else prom.resolve(token);
  });
  failedQueue = [];
};

api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return api(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      const refreshToken = localStorage.getItem("refreshToken");
      if (!refreshToken) {
        isRefreshing = false;
        localStorage.clear();
        window.location.href = "/auth";
        return Promise.reject(error);
      }

      try {
        const { data } = await axios.post(`${API_BASE}/auth/refresh-token`, {
          refreshToken,
        });
        const newAccessToken = data.data.accessToken;
        const newRefreshToken = data.data.refreshToken;

        localStorage.setItem("accessToken", newAccessToken);
        localStorage.setItem("refreshToken", newRefreshToken);

        api.defaults.headers.Authorization = `Bearer ${newAccessToken}`;
        processQueue(null, newAccessToken);

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);
        localStorage.clear();
        window.location.href = "/auth";
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

// ─── AUTH ────────────────────────────────────────────────
export const authAPI = {
  register: (payload) => api.post("/auth/register", payload),
  login: (payload) => api.post("/auth/login", payload),
  verifyOTP: (payload) => api.post("/auth/verify-otp", payload),
  sendOTP: (payload) => api.post("/auth/send-otp", payload),
  refreshToken: (payload) => api.post("/auth/refresh-token", payload),
  logout: () => {
    const refreshToken = localStorage.getItem("refreshToken");
    return api.post("/auth/logout", { refreshToken });
  },
};

// ─── USER ────────────────────────────────────────────────
export const userAPI = {
  getProfile: () => api.get("/users/me"),
  updateProfile: (payload) => api.put("/users/me", payload),
  changePassword: (payload) => api.put("/users/me/password", payload),
  updateProfileImage: (formData) =>
    api.put("/users/me/profile-image", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    }),
};

// ─── PROPERTIES ──────────────────────────────────────────
export const propertyAPI = {
  getAll: (params) => api.get("/properties", { params }),
  getById: (id) => api.get(`/properties/${id}`),
  getMine: (params) => api.get("/properties/my", { params }),
  create: (payload) => api.post("/properties", payload),
  update: (id, payload) => api.put(`/properties/${id}`, payload),
  delete: (id) => api.delete(`/properties/${id}`),
  uploadImages: (id, formData) =>
    api.post(`/properties/${id}/images`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    }),
  deleteImage: (propertyId, imageId) =>
    api.delete(`/properties/${propertyId}/images/${imageId}`),
};

// ─── SAVED PROPERTIES ────────────────────────────────────
export const savedPropertyAPI = {
  getAll: () => api.get("/saved-properties"),
  save: (propertyId) => api.post(`/saved-properties/${propertyId}`),
  unsave: (propertyId) => api.delete(`/saved-properties/${propertyId}`),
};

// ─── REQUESTS ────────────────────────────────────────────
export const requestAPI = {
  getAll: () => api.get("/requests"),
  create: (payload) => api.post("/requests", payload),
  update: (id, payload) => api.put(`/requests/${id}`, payload),
};

// ─── ANALYTICS ───────────────────────────────────────────
export const analyticsAPI = {
  getOverview: () => api.get("/analytics/overview"),
};

// ─── SERVICES ────────────────────────────────────────────
export const serviceAPI = {
  getAll: () => api.get("/services"),
  getBySlug: (slug) => api.get(`/services/${slug}`),
  getProviders: (slug) => api.get(`/services/${slug}/providers`),
};

// ─── PROVIDERS ───────────────────────────────────────────
export const providerAPI = {
  getById: (id) => api.get(`/providers/${id}`),
};

export default api;
