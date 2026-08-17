export const MAX_UPLOAD_FILE_SIZE = 25 * 1024 * 1024;

const ALLOWED_EXTENSIONS = [".ppt", ".pptx", ".pdf", ".png", ".jpg", ".jpeg", ".gif", ".webp"];

export function isAllowedUploadFile(file) {
  const extension = typeof file?.name === "string" ? file.name.slice(file.name.lastIndexOf(".")).toLowerCase() : "";
  return Boolean(file && typeof file.size === "number" && file.size > 0 && file.size <= MAX_UPLOAD_FILE_SIZE && (ALLOWED_EXTENSIONS.includes(extension) || file.type?.startsWith("image/")));
}
