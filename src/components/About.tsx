import React from "react";
import { Box, Button, Grommet, Heading, Layer, Text } from "grommet";
import { WhatPlaneTheme } from "../theme/WhatPlane";
import { FormClose } from "grommet-icons";

export const About = () => {
  const [open, setOpen] = React.useState<boolean>();

  const onOpen = () => setOpen(true);

  const onClose = () => setOpen(undefined);

  return (
    <Grommet theme={WhatPlaneTheme}>
      <Box>
        <Button
          label={
            <Text>
              <strong>About</strong>
            </Text>
          }
          onClick={onOpen}
          plain
        />
      </Box>
      {open && (
        <Layer onClickOutside={onClose} onEsc={onClose}>
          <Box pad="medium" gap="small" width="medium">
            <Heading level={3} margin="none">
              About
            </Heading>
            <Text>About page</Text>
            <Box
              as="footer"
              gap="small"
              direction="row"
              align="center"
              justify="end"
              pad={{ top: "small", bottom: "small" }}
            >
              <Button
                label={<FormClose color="white" size="medium" />}
                onClick={onClose}
                primary
              />
            </Box>
          </Box>
        </Layer>
      )}
    </Grommet>
  );
};

About.story = {
  name: "Center",
  parameters: {
    chromatic: { disable: true },
  },
};
