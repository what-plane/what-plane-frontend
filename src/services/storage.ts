import { BlockBlobClient } from "@azure/storage-blob";
import axios from "axios";

export interface AzureBlobParams {
  url: string;
  container: string;
  uuid: string;
  sasToken: string;
}

// Upload file to blob
const uploadFileToBlob = async (file: File): Promise<AzureBlobParams> => {
  let azureBlobParams: AzureBlobParams;

  // Get sasKey, container, etc.. from API
  try {
    const response = await axios.get<AzureBlobParams>("/api/ImageSAS/");
    azureBlobParams = response.data;
  } catch (e) {
    throw new Error(e);
  }

  if (azureBlobParams) {
    // Create BlobClient
    const blobClient = new BlockBlobClient(constructBlobURL(azureBlobParams));

    const options = { blobHTTPHeaders: { blobContentType: file.type } };

    await blobClient.uploadData(file, options);
  }
  return azureBlobParams;
};

export const constructBlobURL = (azureBlobParams: AzureBlobParams): string => {
  const urlPart = [
    azureBlobParams.url,
    azureBlobParams.container,
    azureBlobParams.uuid,
  ].join("/");
  const fullURL = `${urlPart}?${azureBlobParams.sasToken}`;
  return fullURL;
};

export default uploadFileToBlob;
