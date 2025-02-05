import { toast } from "react-toastify";
import SummaryApi from "../common/SummaryApi";

const MAX_FILE_SIZE = 1048576; // 1MB

export async function uploadImage(file) {
  if (!file) {
    toast.error("No file selected");
    return null;
  }

  if (file.size > MAX_FILE_SIZE) {
    toast.error("File must be smaller than 1MB");
    return null;
  }

  const imageFormData = new FormData();
  imageFormData.append("file", file);

  try {
    const token = localStorage.getItem("accessToken");
    const response = await fetch(SummaryApi.uploadImage.url, {
      method: SummaryApi.uploadImage.method,
      headers: { Authorization: `Bearer ${token}` },
      body: imageFormData,
    });

    if (!response.ok) {
      throw new Error(`Upload failed: ${response.statusText}`);
    }

    const { url } = await response.json();
    if (!url) throw new Error("Invalid response: missing URL");


    return url;
  } catch (error) {
    toast.error(error.message || "An error occurred while uploading the image");
    return null;
  }
}
