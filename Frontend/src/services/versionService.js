import { apiRequest } from "./api";

export const versionService = {
  list: () => apiRequest("/versions"),
};
