import React from "react";
import { Box, Grid, Grommet, Heading, Text, Image, Button } from "grommet";
import { Card, CardHeader, CardBody, CardFooter } from "grommet";
import { FaGithub } from "react-icons/fa";
import { grommet } from "grommet/themes";
import { DisplayResult } from "./components/DisplayResult";

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
            <DisplayResult />
          </Box>
        </Grid>
      </Box>
    </Grommet>
  );
}

export default App;
