import axiosInstance from "./axiosInstance";
export const handleUpload = async (file, type) => {
  try {
    if (!file) {
      throw new Error("No file selected for upload");
    }

    const formData = new FormData();
    formData.append(type === "image" ? "image" : "video", file);

    const { data } = await axiosInstance.post(
      type === "image" ? "/api/image" : "/api/video",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return type === "image" ? data?.image : data?.video;
  } catch (error) {
    console.log(error);
    return error;
  }
};
export const handleDeleteFile = async (id, type) => {
  try {
    if (!id) {
      throw new Error("No id found");
    }

    const { data } = await axiosInstance.delete(
      type === "image" ? `/api/image/${id}` : `/api/video/${id}`
    );
    return type === "image" ? data?.image : data?.video;
  } catch (error) {
    console.log(error);
    return error;
  }
};
