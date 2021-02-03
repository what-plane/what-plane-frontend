import { BlockBlobClient } from "@azure/storage-blob";
import axios from "axios";

// Upload file to blob
const uploadFileToBlob = async (file: File | null): Promise<string> => {
  if (!file) return "";

  // Get sasKey, container, etc.. from API
  const {
    sasKey,
    containerName,
    url,
    uuid,
  }: {
    sasKey: string;
    containerName: string;
    url: string;
    uuid: string;
  } = await axios.get("/api/ImageSAS/").then((response) => {
    return response.data;
  });

  // Create BlobClient
  const blobClient = new BlockBlobClient(
    url + "/" + containerName + "/" + uuid + "?" + sasKey
  );

  const options = { blobHTTPHeaders: { blobContentType: file.type } };

  await blobClient.uploadData(file, options);

  const blobURL: string = blobClient.url;
  console.log("Blob URL", blobURL);
  return blobURL;
};

export default uploadFileToBlob;
