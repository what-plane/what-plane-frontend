import React from "react";
import { Text, Box } from "grommet";

import { Prediction } from "../services/predictions";

interface PredictionResultProps {
  prediction: Prediction;
}

const PredictionResult: React.FC<PredictionResultProps> = ({ prediction }) => {
  return (
    <Box
      align="end"
      justify="center"
      direction="row-responsive"
      fill="horizontal"
      round="medium"
      gap="medium"
      pad={{ vertical: "small" }}
    >
      <Box
        align="center"
        justify="center"
        direction="row-responsive"
        gap="small"
        fill="vertical"
      >
        <Box>
          <Text textAlign="center" weight="bold" size="medium">
            Prediction:
          </Text>
        </Box>
        <Box>
          <Text textAlign="center" size="medium">
            {prediction.class_name}
          </Text>
        </Box>
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
  );
};

export default PredictionResult;
