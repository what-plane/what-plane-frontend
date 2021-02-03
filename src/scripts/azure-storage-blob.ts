import { BlobServiceClient, ContainerClient } from "@azure/storage-blob";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

// Azure Storage Container Details

const containerName = `uploaded-images`;
const storageAccountName = process.env.storageresourcename || "whatplane";

// Create file in storage container
const createFileInContainer = async (
  containerClient: ContainerClient,
  file: File
) => {
  const fileExtension = file.name.split(".").pop();
  const newName = uuidv4() + "." + fileExtension; // Generate UUID for filename

  // Create blobClient for container
  const blobClient = containerClient.getBlockBlobClient(newName);

  const options = { blobHTTPHeaders: { blobContentType: file.type } };

  // Upload data
  await blobClient.uploadData(file, options);

  // Get blob url
  const blobURL: string = blobClient.url;
  console.log("Blob URL", blobURL);
  return blobURL;
};

// Upload file to blob
const uploadFileToBlob = async (file: File | null): Promise<string> => {
  if (!file) return "";

  // Get SAS token from Azure Function
  const sasToken: string = await axios
    .get("https://whatplane.azurewebsites.net/api/uploadimagesas/")
    .then((response) => {
      return response.data.sasKey;
    });

  // Get BlobService
  const blobService = new BlobServiceClient(
    `https://${storageAccountName}.blob.core.windows.net/?${sasToken}`
  );

  // Get Container
  const containerClient: ContainerClient = blobService.getContainerClient(
    containerName
  );

  // Upload file
  return createFileInContainer(containerClient, file);
};

export default uploadFileToBlob;
