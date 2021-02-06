import React from "react";
import { Button, Image, Box } from "grommet";
import { PredictData } from "../services/predictions";
import { WhatPlaneResult } from "./WhatPlaneResult"

export const DisplayResults = ({
  imageURL,
  predictionData,
  onClickNewImage,
}: {
  imageURL: string;
  predictionData: PredictData;
  onClickNewImage: any;
}) => {
  const prediction = predictionData.predictions[0]
  return (
    <Box>
      <Box
        align="center"
        justify="center"
        fill="horizontal"
        round="small"
        overflow="hidden"
      >
        <Image src={imageURL} fill="horizontal" />
      </Box>
      { predictionData.predictor !== "whatplane" }
      <WhatPlaneResult prediction={prediction}/>
      <Box
        align="end"
        justify="center"
        pad="medium"
        direction="row-responsive"
        fill="horizontal"
      >
        <Button label="New Image" onClick={onClickNewImage} />
      </Box>
    </Box>
  );
};
