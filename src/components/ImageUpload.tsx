import React from "react";
import { Button, Form, Box, Text } from "grommet";
import Dropzone from "react-dropzone";

export const ImageUpload = () => {
  return (
    <Box>
      <Form>
        <Box align="center" justify="center" fill="horizontal" pad="xsmall">
          <Dropzone onDrop={(acceptedFiles) => console.log(acceptedFiles)}>
            {({ getRootProps, getInputProps }) => (
                <div {...getRootProps()}>
                  <input {...getInputProps()} />
                  <Box
                    align="center"
                    justify="center"
                    background={{ color: "dark-5" }}
                    round="small"
                    pad="medium"
                    fill="horizontal"
                  >
                    <Text color="white">
                      Drag and drop an image here, or click to select
                    </Text>
                  </Box>
                </div>
            )}
          </Dropzone>
        </Box>
        <Box
          align="end"
          justify="center"
          pad="xsmall"
          direction="row-responsive"
          fill="horizontal"
        >
          <Button label="Submit" />
        </Box>
      </Form>
    </Box>
  );
};
