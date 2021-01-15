import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import {
  StorageSharedKeyCredential,
  ContainerSASPermissions,
  generateBlobSASQueryParameters,
} from "@azure/storage-blob";
import { match } from "assert";
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

const generateSASToken = (container: string, permissions: string): any => {
  const uuidStr: string = v4();

  const accountData = parseConnString(process.env.AzureWebJobsStorage);
  const sharedKeyCredential: StorageSharedKeyCredential = new StorageSharedKeyCredential(
    accountData.name,
    accountData.key
  );

  // Create a SAS token that expires in a few minutes
  const expiryDate: Date = new Date();
  expiryDate.setMinutes(expiryDate.getMinutes() + 5);

  const sasKey = generateBlobSASQueryParameters(
    {
      containerName: container,
      permissions: ContainerSASPermissions.parse(permissions),
      expiresOn: expiryDate,
    },
    sharedKeyCredential
  );

  return {
    sasKey: sasKey.toString(),
    url: accountData.url,
    uuid: uuidStr,
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
