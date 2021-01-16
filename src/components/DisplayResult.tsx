import React from "react";
import {
  Card,
  CardHeader,
  Heading,
  Button,
  Text,
  CardBody,
  CardFooter,
  Box,
  Image,
} from "grommet";
import { FaGithub } from "react-icons/fa";

export const DisplayResult = () => {
  return (
    <Card height="50%" width="large" background="light-1">
      <CardHeader pad={{ horizontal: "medium" }}>
        <Heading level="1" style={{ fontWeight: "bold" }}>
          WhatPlane?
        </Heading>
        <Button
          size="small"
          color="light-3"
          primary
          // label="GitHub"
          icon={<FaGithub />}
        />
      </CardHeader>

      <CardBody pad="small">
        <Box>
          <Image fit="contain" src="images/a350_1.jpg" />
        </Box>
      </CardBody>
      <CardFooter
        pad={{ horizontal: "medium", vertical: "small" }}
        background="#F2F2F2"
      >
        <Text
          size="small"
          color="brand"
          weight="bold"
          style={{ textTransform: "uppercase", color: "#63B3ED" }}
        >
          Prediction
        </Text>
        <Text
          weight="bold"
          size="medium"
          style={{ textTransform: "uppercase" }}
        >
          Class Name
        </Text>
        <Box
          background="status-ok"
          pad={{ horizontal: "xsmall", vertical: "xsmall" }}
          round="xsmall"
        >
          <Text
            size="small"
            weight="bold"
            color="white"
            style={{ textTransform: "uppercase" }}
          >
            90 Percent
          </Text>
        </Box>
      </CardFooter>
    </Card>
  );
};
