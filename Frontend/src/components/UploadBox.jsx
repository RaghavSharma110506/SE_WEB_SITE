import { useRef, useState } from "react";
import { isAllowedUploadFile } from "../services/uploadValidation";

export default function UploadBox({ files, onFilesChange, disabled }) {
  const inputRef = useRef(null);
  const [dragging, setDragging] = useState(false);
  const [error, setError] = useState("");
  const addFiles = (fileList) => {
    const nextFiles = Array.from(fileList || []);
    const invalid = nextFiles.find((file) => !isAllowedUploadFile(file));
    if (invalid) { setError(`${invalid.name} must be a PPT, PPTX, PDF or image no larger than 25 MB.`); return; }
    setError("");
    onFilesChange(nextFiles);
  };
  return <div className={`upload-box ${dragging ? "dragging" : ""} ${error ? "has-error" : ""}`} onDragEnter={(event) => { event.preventDefault(); setDragging(true); }} onDragOver={(event) => event.preventDefault()} onDragLeave={() => setDragging(false)} onDrop={(event) => { event.preventDefault(); setDragging(false); addFiles(event.dataTransfer.files); }}>
    <input ref={inputRef} name="files" type="file" multiple accept=".ppt,.pptx,.pdf,image/*" disabled={disabled} onChange={(event) => addFiles(event.target.files)} />
    <b>Drop files here</b><span>Supports PPT, PDF and images up to 25 MB each. Choose multiple files for folder contents.</span>
    <button type="button" onClick={() => inputRef.current?.click()} disabled={disabled}>Browse files</button>
    {files.length > 0 && <ul>{files.map((file) => <li key={`${file.name}-${file.lastModified}`}>{file.name} <small>{Math.ceil(file.size / 1024)} KB</small></li>)}</ul>}
    {error && <p role="alert">{error}</p>}
  </div>;
}
