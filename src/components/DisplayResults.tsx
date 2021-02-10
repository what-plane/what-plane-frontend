import React from "react";
import { Button, Image, Box, Text } from "grommet";
import { MdError } from "react-icons/md";
import PredictionResult from "./PredictionResult";

import { PredictData, Prediction } from "../services/predictions";

interface DisplayResultsProps {
  imageURL: string;
  predictionData: PredictData;
  onClickNewImage: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
}

export const DisplayResults: React.FC<DisplayResultsProps> = ({
  imageURL,
  predictionData,
  onClickNewImage,
}) => {
  let prediction: Prediction;
  if (predictionData.predictions[0]) {
    prediction = predictionData.predictions[0];
  } else {
    throw new Error("Unable to parse prediction data");
  }

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
            Hey, it looks like you've uploaded a picture that doesn't have an
            aeroplane in it!
          </Text>
        </Box>
      )}

      <PredictionResult prediction={prediction} />

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
