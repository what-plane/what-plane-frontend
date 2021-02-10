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

  // Get UUID, sasToken, container, etc.. from API
  try {
    const response = await axios.get<AzureBlobParams>("/api/ImageSAS/");
    azureBlobParams = response.data;
  } catch (e) {
    throw new Error(
      `Unable to fetch blob information from API, failed with error: ${e}`
    );
  }

  if (azureBlobParams) {
    try {
      // Create BlobClient
      const blobClient = new BlockBlobClient(constructBlobURL(azureBlobParams));

      const options = { blobHTTPHeaders: { blobContentType: file.type } };

      await blobClient.uploadData(file, options);
    } catch (e) {
      throw new Error(`Unable to upload image, failed with error: ${e}`);
    }
  }
  return azureBlobParams;
};

export const constructBlobURL = (azureBlobParams: AzureBlobParams): string => {
  // Take blob params and assemble full URL for blob
  const urlPart = [
    azureBlobParams.url,
    azureBlobParams.container,
    azureBlobParams.uuid,
  ].join("/");
  const fullURL = `${urlPart}?${azureBlobParams.sasToken}`;
  return fullURL;
};

export default uploadFileToBlob;
