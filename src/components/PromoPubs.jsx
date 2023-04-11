// promo pubs component definition

import * as React from "react";
import Carousel from "react-material-ui-carousel";

import { useTheme, Stack, Box, Typography, useMediaQuery } from "@mui/material";

const PromoPubs = ({}) => {
  const theme = useTheme();

  const screen1100 = useMediaQuery(theme.breakpoints.down(1100));
  const screen750 = useMediaQuery(theme.breakpoints.down(750));

  return (
    <Stack
      direction={"column"}
      sx={{
        width: "100%",
        // px: screen1100 ? "0rem" : "1.5rem",
      }}
    >
      <Carousel
        indicatorContainerProps={false}
        indicators={false}
        direction={"column"}
        sx={{}}
      >
        {new Array(5).fill("value").map((target, index) => {
          return (
            <Stack
              key={index}
              direction={"column"}
              sx={{
                width: "100%",
              }}
            >
              <img
                alt={"pub_pic"}
                src={"/offre.jpg"}
                style={{
                  width: "100%",
                }}
              />
            </Stack>
          );
        })}
      </Carousel>
    </Stack>
  );
};

export default PromoPubs;
