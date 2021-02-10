import React, { useState } from "react";
import {
  Box,
  Button,
  Grommet,
  Heading,
  Layer,
  Text,
  List,
  Paragraph,
} from "grommet";
import { deepMerge } from "grommet/utils";
import { grommet, ThemeType } from "grommet/themes";
import { Close } from "grommet-icons";
import fetchClasses from "../services/classes";

const theme: ThemeType = deepMerge(grommet, {
  list: {
    item: {
      pad: { horizontal: "large", vertical: "xsmall" },
      background: ["white", "light-2"],
      border: true,
    },
  },
});

export const About = () => {
  const [open, setOpen] = useState<boolean>();
  const [predClassNames, setPredClassNames] = useState<Array<string>>([]);

  const onOpen = async () => {
    const classes = await fetchClasses();
    setPredClassNames(classes.class_names);
    setOpen(true);
  };

  const onClose = async () => {
    setOpen(undefined);
    setPredClassNames([]);
  };

  return (
    <Grommet theme={theme}>
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
            <Paragraph size="small">
              WhatPlane uses Deep Learning to detect the types of aircraft in
              images. It also uses the ImageNet model to identify images that do
              not have an aircraft in them. <br />
              The model currently recognises the following aircraft types, but
              we're working hard to add more and improve the performance!
            </Paragraph>
            {/* <Box width="90%" align="center" justify="center"> */}
            <Text size="xsmall" textAlign="center">
              <Text size="small" weight="bold">
                List of Aircraft
              </Text>
              <List data={predClassNames} margin="xsmall" pad="xsmall"></List>
            </Text>
            {/* </Box> */}

            <Box
              as="footer"
              gap="small"
              direction="row"
              align="center"
              justify="end"
              pad={{ top: "small", bottom: "small" }}
            >
              <Button
                icon={<Close color="dark-1" size="medium" />}
                onClick={onClose}
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
