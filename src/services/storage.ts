import { BlockBlobClient } from "@azure/storage-blob";
import axios from "axios";

// Azure Storage Container Details

const containerName = `uploaded-images`;

// Upload file to blob
const uploadFileToBlob = async (file: File | null): Promise<string> => {
  if (!file) return "";

  // Get SAS token from Azure Function
  const {
    sasKey,
    url,
    uuid,
  }: { sasKey: string; url: string; uuid: string } = await axios
    .get("/api/ImageSAS/")
    .then((response) => {
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
