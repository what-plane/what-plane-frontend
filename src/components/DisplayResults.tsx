import React from "react";
import { Button, Text, Image, Box } from "grommet";
import { Prediction } from "../services/predictions";

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
      <Box
        align="end"
        justify="center"
        direction="row-responsive"
        fill="horizontal"
        round="medium"
        gap="xlarge"
        pad={{ vertical: "small" }}
      >
        <Box
          align="center"
          justify="center"
          direction="row"
          gap="xsmall"
          fill="vertical"
        >
          <Text textAlign="start" weight="bold" size="large">
            Prediction:
          </Text>
          <Text size="large">{prediction.class_name}</Text>
        </Box>
        <Box
          align="center"
          justify="center"
          pad="small"
          background={{ color: prediction.class_status }}
          round="xsmall"
          fill="vertical"
        >
          <Text weight="bold" color="white">
            {prediction.class_prob.toFixed(1)} Percent
          </Text>
        </Box>
      </Box>
      <Box
        align="end"
        justify="center"
        pad="xsmall"
        direction="row-responsive"
        fill="horizontal"
      >
        <Button label="New Image" onClick={onClickNewImage} />
      </Box>
    </Box>
  );
};
