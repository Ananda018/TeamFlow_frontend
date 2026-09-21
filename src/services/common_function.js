export const getSettingValue = (data = {}, key, fallback = null) => {
  if (!data || typeof data !== "object") return fallback;
  return data[key] ?? fallback;
};
