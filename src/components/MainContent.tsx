import React, { useState } from "react";
import { Heading, Box } from "grommet";
import { ImageUpload } from "./ImageUpload";
import { LoadingSpinner } from "./LoadingSpinner";
import { DisplayResults } from "./DisplayResults";

import uploadFileToBlob from "../services/storage";
import fetchPrediction from "../services/predictions";

export const MainContent = () => {
  const [imageURL, setImageURL] = useState<string>("");
  const [prediction, setPrediction] = useState({
    class_name: "",
    class_prob: "0",
  });

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
  return (
    <Box
      align="center"
      justify="center"
      background={{ color: "light-1" }}
      round="medium"
      elevation="small"
      pad="medium"
      fill="horizontal"
    >
      <Box
        align="center"
        justify="start"
        direction="row"
        fill="horizontal"
        pad={{ vertical: "small" }}
      >
        <Heading
          size="small"
          textAlign="start"
          margin={{ horizontal: "none", vertical: "none" }}
        >
          Upload Image
        </Heading>
      </Box>
      <ImageUpload onFileSelect={onFileSelect} onClickSubmit={onClickSubmit} />
    </Box>
  );
};
