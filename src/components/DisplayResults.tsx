import React from "react";
import { Button, Image, Box } from "grommet";
import { Prediction } from "../services/predictions";
import { WhatPlaneResult } from "./WhatPlaneResult"

export const DisplayResults = ({
  imageURL,
  prediction,
  onClickNewImage,
}: {
  imageURL: string;
  prediction: Prediction;
  onClickNewImage: any;
}) => {
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
