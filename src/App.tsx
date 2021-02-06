import React from "react";
import { Grommet, Box, Header, Heading, Button } from "grommet";
import { FaGithub } from "react-icons/fa";
import { MainContent } from "./components/MainContent";
import { WhatPlaneTheme } from "./theme/WhatPlane";
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
            >
              <Heading>WhatPlane?</Heading>
              <Button
                size="large"
                href="https://github.com/what-plane"
                target="_blank"
                icon={<FaGithub />}
              />
            </Box>
            <MainContent />
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
