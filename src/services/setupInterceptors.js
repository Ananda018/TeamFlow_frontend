export const setupInterceptors = (store, api) => {
  api.interceptors.request.use((config) => {
    const state = store.getState();
    const token = state?.auth?.token;

    if (token) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${token}`,
      };
    }

    return config;
  });

  api.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error?.response?.status === 401) {
        console.warn("Unauthorized access");
      }
      return Promise.reject(error);
    },
  );
};
