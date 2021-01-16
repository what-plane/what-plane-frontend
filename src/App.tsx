import React from "react";
import { Box, Grid, Grommet, Heading, Text, Image, Button } from "grommet";
import { Card, CardHeader, CardBody, CardFooter } from "grommet";
import { FaGithub } from "react-icons/fa";
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
            style={{ backgroundColor: "#ED64A6" }}
            pad={{ left: "medium", right: "small", vertical: "small" }}
          />
          <Box
            gridArea="main"
            pad="medium"
            responsive={true}
            align="center"
            justify="start"
            direction="column"
            background={{
              position: "50% 70%",
              repeat: "no-repeat",
              size: "contain",
              image: "url(images/bg.svg)",
            }}
          >
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
          </Box>
        </Grid>
      </Box>
    </Grommet>
  );
}

export default App;
