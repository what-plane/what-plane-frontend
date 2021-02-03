import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import {
  StorageSharedKeyCredential,
  ContainerSASPermissions,
  generateBlobSASQueryParameters,
  BlobSASSignatureValues,
} from "@azure/storage-blob";
import { v4 } from "uuid";

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  const permissions = "rc";
  const container = "uploaded-images";

  context.res = {
    // status: 200, /* Defaults to 200 */
    body: generateSASToken(container, permissions),
  };
};

const generateSASToken = (
  container: string,
  permissions: string,
  blobOnly: boolean = true
): any => {
  const uuidStr: string = v4();

  const connString: string = process.env.AZURE_BLOB_CONN_STRING;
  if (connString == null) {
    throw new Error("Unable to load Connection String");
  }

  const accountData = parseConnString(connString);
  const sharedKeyCredential: StorageSharedKeyCredential = new StorageSharedKeyCredential(
    accountData.name,
    accountData.key
  );

  // Create a SAS token that expires in a few minutes
  const expiryDate: Date = new Date();
  expiryDate.setMinutes(expiryDate.getMinutes() + 5);

  let sasSignatureValues: BlobSASSignatureValues = {
    containerName: container,
    permissions: ContainerSASPermissions.parse(permissions),
    expiresOn: expiryDate,
  };

  if (blobOnly) {
    sasSignatureValues = { ...sasSignatureValues, blobName: uuidStr };
  }

  const sasKey = generateBlobSASQueryParameters(
    sasSignatureValues,
    sharedKeyCredential
  );

  return {
    url: accountData.url,
    container: container,
    uuid: uuidStr,
    sasKey: sasKey.toString(),
  };
};

const extractConnStringElement = (
  connString: string,
  element: string
): string => {
  const regexStr: string = `(?<=${element}=)[^;]+`;
  const matchArr: Array<string> = connString.match(regexStr);
  if (matchArr) {
    return matchArr[0];
  } else {
    throw new Error(`Unable to parse ${element} from Connection String`);
  }
};

const parseConnString = (
  connString: string
): { name: string; key: string; url: string } => {
  const accountName: string = extractConnStringElement(
    connString,
    "AccountName"
  );
  const accountKey: string = extractConnStringElement(connString, "AccountKey");
  const url: string =
    extractConnStringElement(connString, "DefaultEndpointsProtocol") +
    "://" +
    accountName +
    ".blob." +
    extractConnStringElement(connString, "EndpointSuffix");

  return {
    name: accountName,
    key: accountKey,
    url: url,
  };
};

export default httpTrigger;
