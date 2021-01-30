import React from "react";
import { Button, Text, Image, Box } from "grommet";

export const DisplayResults = () => {
  return (
    <Box>
        <Box align="center" justify="center" fill="horizontal" round="small" overflow="hidden">
        <Image src="images/Delta_Air_Lines_Boeing_737-832.jpg" fill="horizontal" />
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
          <Text size="large">A380</Text>
        </Box>
        <Box
          align="center"
          justify="center"
          pad="small"
          background={{ color: "status-ok" }}
          round="xsmall"
          fill="vertical"
        >
          <Text weight="bold" color="white">
            90 Percent
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
        <Button label="New Image" />
      </Box>
    </Box>
  );
};
