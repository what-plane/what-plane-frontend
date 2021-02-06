import React, { useState } from "react";
import { Heading, Box } from "grommet";
import { ImageUpload } from "./ImageUpload";
import { LoadingSpinner } from "./LoadingSpinner";
import { DisplayResults } from "./DisplayResults";

import uploadFileToBlob from "../services/storage";
import { Prediction, fetchPrediction } from "../services/predictions";

export const MainContent = () => {
  const [imageURL, setImageURL] = useState<string>("");
  const [prediction, setPrediction] = useState<Prediction>();

  // file to upload to container
  const [fileSelected, setFileSelected] = useState<File>();

  const [uploading, setUploading] = useState(false);

  const onFileSelect = (selectedFiles: Array<File>) => {
    // capture file into state
    setFileSelected(selectedFiles[0]);
  };

  const onClickSubmit = async () => {
    if (fileSelected) {
      if (!["image/jpeg", "image/png"].includes(fileSelected?.type)) {
        alert("Please select an image filetype (jpg/png)");
      } else if (fileSelected.size > 20971520) {
        alert("Please upload a smaller image (max file size: 20Mb)");
      } else {
        setUploading(true);
        // Upload to Azure Storage
        const thisBlobURL: string = await uploadFileToBlob(fileSelected);

        // prepare UI for results
        setImageURL(thisBlobURL);
        const predObject = await fetchPrediction(thisBlobURL);
        setPrediction(predObject);

        // reset state
        setFileSelected(undefined);
        setUploading(false);
      }
    }
  };

  const onClickNewImage = () => {
    setFileSelected(undefined);
    setPrediction(undefined);
    setImageURL("");
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
          Upload Image
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
        {!uploading && prediction === undefined && (
          <ImageUpload
            onFileSelect={onFileSelect}
            onClickSubmit={onClickSubmit}
          />
        )}
        {uploading && prediction === undefined && <LoadingSpinner />}
        {prediction !== undefined && (
          <DisplayResults
            imageURL={imageURL}
            prediction={prediction}
            onClickNewImage={onClickNewImage}
          />
        )}
      </Box>
    </Box>
  );
};
