import React from "react";
import { Heading, Box } from "grommet";
import { ImageUpload } from "./ImageUpload";
import { LoadingSpinner } from "./LoadingSpinner"
import { DisplayResults } from "./DisplayResults";


export const MainContent = () => {
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
      <ImageUpload />
    </Box>
  );
};
