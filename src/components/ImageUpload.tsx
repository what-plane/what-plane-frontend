import React from "react";
import { Button, Form, Box, Text } from "grommet";
import Dropzone from "react-dropzone";

export const ImageUpload = ({
  onFileSelect,
  onClickSubmit,
  dropzoneText,
}: {
  onFileSelect: (event: any) => void;
  onClickSubmit: () => Promise<void>;
  dropzoneText: string;
}) => {
  return (
    <Form style={{ width: "50%" }}>
      <Box>
        <Dropzone
          onDrop={onFileSelect}
          accept={["image/jpeg", "image/png"]}
          minSize={0}
          maxSize={20971520}
        >
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
                <Text textAlign="center" size="small" color="white">
                  {dropzoneText}
                </Text>
              </Box>
            </div>
          )}
        </Dropzone>
      </Box>
      <Box
        align="end"
        justify="center"
        pad="medium"
        direction="row"
        fill="horizontal"
      >
        <Button label="Submit" onClick={onClickSubmit} />
      </Box>
    </Form>
  );
};
