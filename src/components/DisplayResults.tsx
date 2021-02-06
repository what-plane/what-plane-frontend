import React from "react";
import { Button, Image, Box, Text } from "grommet";
import { PredictData } from "../services/predictions";
import { WhatPlaneResult } from "./WhatPlaneResult";
import { MdError } from "react-icons/md";

export const DisplayResults = ({
  imageURL,
  predictionData,
  onClickNewImage,
}: {
  imageURL: string;
  predictionData: PredictData;
  onClickNewImage: any;
}) => {
  const prediction = predictionData.predictions[0];
  return (
    <Box>
      <Box
        align="center"
        justify="center"
        fill="horizontal"
        round="small"
        overflow="hidden"
      >
        <Image src={imageURL} fill="horizontal" margin="small" />
      </Box>
      {predictionData.predictor !== "whatplane" && (
        <Box pad="xsmall" justify="center" align="center">
          <Text size="xsmall">
            <Text color="status-warning" size="xsmall">
              <MdError />{" "}
            </Text>
            Hey, it looks like you've uploaded a picture that doesn't have a
            plane in it!
          </Text>
        </Box>
      )}

      <WhatPlaneResult prediction={prediction} />

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
