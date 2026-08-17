import { API_BASE_URL } from "./api";

export function uploadDeliverable(data, token, onProgress) {
  return new Promise((resolve, reject) => {
    const request = new XMLHttpRequest();
    const form = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (key === "files") value.forEach((file) => form.append("files", file));
      else form.append(key, value);
    });
    request.open("POST", `${API_BASE_URL}/deliverables`);
    request.setRequestHeader("Authorization", `Bearer ${token}`);
    request.upload.onprogress = (event) => { if (event.lengthComputable) onProgress(Math.round((event.loaded / event.total) * 100)); };
    request.onerror = () => reject(new Error("Network error while uploading the deliverable."));
    request.onload = () => {
      let response = {};
      try { response = JSON.parse(request.responseText); } catch { /* response remains empty */ }
      if (request.status >= 200 && request.status < 300) resolve(response);
      else reject(new Error(response.message || "Upload failed."));
    };
    request.send(form);
  });
}
