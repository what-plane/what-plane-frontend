import React, { useState } from "react";
import { Heading, Box } from "grommet";
import { ImageUpload } from "./ImageUpload";
import { LoadingSpinner } from "./LoadingSpinner";
import { DisplayResults } from "./DisplayResults";

import uploadFileToBlob, { constructBlobURL } from "../services/storage";
import { PredictData, fetchPrediction } from "../services/predictions";

type Nullable<T> = T | null;

export const MainContent = () => {
  const [imageURL, setImageURL] = useState<string>("");
  const [predictionData, setPredictionData] = useState<Nullable<PredictData>>(null);

  // file to upload to container
  const [fileSelected, setFileSelected] = useState<Nullable<File>>(null);
  const [dropzoneText, setDropzoneText] = useState("Drop or Select an Image");

  const [uploading, setUploading] = useState(false);

  const onFileSelect = (selectedFiles: Array<File>) => {
    // capture file into state
    setFileSelected(selectedFiles[0]);
    setDropzoneText(selectedFiles[0].name);
  };

  const onClickSubmit = async () => {
    if (fileSelected) {
      if (!["image/jpeg", "image/png"].includes(fileSelected?.type)) {
        alert("Please select an image filetype (jpg/png)");
      } else if (fileSelected.size > 20971520) {
        alert("Please upload a smaller image (max file size: 20Mb)");
      } else if (fileSelected.size === 0) {
        alert("Please upload an image larger than 0 bytes");
      } else {
        setUploading(true);
        // Upload to Azure Storage
        const blobParams = await uploadFileToBlob(fileSelected);

        // prepare UI for results
        setImageURL(constructBlobURL(blobParams));
        const predObject = await fetchPrediction(blobParams.uuid);
        setPredictionData(predObject);

        // reset state
        setFileSelected(null);
        setUploading(false);
      }
    }
  };

  const onClickNewImage = () => {
    setFileSelected(null);
    setPredictionData(null);
    setImageURL("");
    setDropzoneText("Drop or Select an Image");
  };
  return (
    <Box
      className="MainWrapper"
      align="center"
      justify="center"
      background={{ color: "light-1" }}
      round="medium"
      elevation="small"
      pad="medium"
      fill="horizontal"
    >
      <Box
        className="MainHeading"
        align="center"
        justify="start"
        direction="row"
        fill="horizontal"
        pad={{ vertical: "medium" }}
      >
        <Heading
          size="small"
          textAlign="start"
          margin={{ horizontal: "none", vertical: "none" }}
        >
          {predictionData === null && "Upload Image"}
          {predictionData !== null && "Results"}
        </Heading>
      </Box>
      <Box
        className="MainContent"
        direction="column"
        align="center"
        justify="center"
        fill="horizontal"
        pad="xsmall"
        style={{ width: "80%" }}
      >
        {!uploading && predictionData === null && (
          <ImageUpload
            dropzoneText={dropzoneText}
            onFileSelect={onFileSelect}
            onClickSubmit={onClickSubmit}
          />
        )}
        {uploading && predictionData === null && <LoadingSpinner />}
        {predictionData !== null && (
          <DisplayResults
            imageURL={imageURL}
            predictionData={predictionData}
            onClickNewImage={onClickNewImage}
          />
        )}
      </Box>
    </Box>
  );
};
