import React from "react";
import { Grommet, Box, Header, Heading, Button, Text } from "grommet";
import { FaGithub } from "react-icons/fa";
import { MainContent } from "./components/MainContent";
import { WhatPlaneTheme } from "./theme/WhatPlane";
import { About } from "./components/About";
import styled from "styled-components";

function App() {
  return (
    <Grommet theme={WhatPlaneTheme} full>
      <PageWrapper
        className="PageWrapper"
        fill="vertical"
        overflow="auto"
        align="center"
        flex="grow"
      >
        <Header
          align="center"
          direction="row"
          flex={false}
          justify="between"
          gap="medium"
          pad="small"
          fill="horizontal"
          background={{ color: "brand" }}
        />
        <Box
          className="PageMain"
          align="center"
          justify="start"
          fill="vertical"
        >
          <Box className="BackgroundImage" width="100%" height="100%"></Box>
          <Box className="PageContent">
            <Box
              align="center"
              justify="between"
              direction="row"
              fill="horizontal"
              pad={{ top: "medium" }}
            >
              <Heading margin="small">WhatPlane?</Heading>
              <Box direction="row" align="center">
                <About />
                <Button
                  size="large"
                  href="https://github.com/what-plane"
                  target="_blank"
                  icon={<FaGithub />}
                />
              </Box>
            </Box>
            <Box pad="small">
              <Text size="xsmall" color="dark-1">
                A passenger aircraft recognition app.
                <br /> Created by Will Parr, Ashrith Yerrapragada and Stephen
                Griffiths
              </Text>
            </Box>

            <MainContent />
            <Box align="center" justify="center" pad="small">
              <Text size="xsmall" color="dark-1">
                By using our app, you agree to us storing the uploaded images
                for future model training and processing.
              </Text>
            </Box>
          </Box>
        </Box>
      </PageWrapper>
    </Grommet>
  );
}

export default App;

const PageWrapper = styled(Box)`
  .BackgroundImage {
    position: absolute;
    z-index: 0;
    opacity: 0.4;
    background-position: 50% 100%;
    background-repeat: no-repeat;
    background-size: contain;
    background-image: url(images/Airport.svg);
    @media (min-height: 1000px) {
      opacity: 1;
      background-position: 50% 100%;
    }
  }
  .PageMain {
    position: relative;
    min-height: 550px;
    width: 80%;
  }
  .PageContent {
    position: relative;
    z-index: 1;
    width: 80%;
  }
`;
