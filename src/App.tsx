import React from "react";
import { Box, Grid, Grommet, Heading, Text, Image } from "grommet";
import { Card, CardHeader, CardBody, CardFooter, Button } from "grommet";
import { grommet } from "grommet/themes";

function App() {
  return (
    <Grommet theme={grommet} full>
      <Box height="100%">
        <Grid
          fill
          rows={["auto", "flex"]}
          columns={["auto", "flex"]}
          areas={[
            { name: "header", start: [0, 0], end: [1, 0] },
            { name: "main", start: [1, 1], end: [1, 1] },
          ]}
        >
          <Box
            gridArea="header"
            direction="row"
            align="center"
            justify="between"
            background="brand"
            pad={{ left: "medium", right: "small", vertical: "small" }}
          />
          <Box
            gridArea="main"
            pad="medium"
            responsive={true}
            align="center"
            justify="center"
            direction="row-responsive"
          >
            <Card height="40%" width="large" background="light-1">
              <CardHeader pad={{ horizontal: "medium" }}>
                <Heading style={{ fontWeight: "bold" }}>WhatPlane</Heading>
                <Text size="xsmall" color="neutral-2">
                  A passenger aircraft recognition app based on DenseNet
                </Text>
              </CardHeader>
              <CardBody pad="medium">
                <Box pad="small" round="small">
                  <Image
                    fit="contain"
                    src="//v2.grommet.io/assets/Wilderpeople_Ricky.jpg"
                  />
                </Box>
              </CardBody>
              <CardFooter
                pad={{ horizontal: "medium", vertical: "small" }}
                background="light-2"
              >
                <Text
                  size="small"
                  color="brand"
                  weight="bold"
                  style={{ textTransform: "uppercase" }}
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
          </Box>
        </Grid>
      </Box>
    </Grommet>
  );
}

export default App;
