import { apiRequest } from "./api";

export const deliverableService = {
  list: () => apiRequest("/deliverables"),
  getBySlug: (slug) => apiRequest(`/deliverables/${slug}`),
  versions: () => apiRequest("/versions"),
};
