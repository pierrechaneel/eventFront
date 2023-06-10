// component definition

import * as React from "react";
import { Stack, Typography, useTheme } from "@mui/material";
import { useRouter } from "next/router";

const MenuItems = ({ apps }) => {
  const theme = useTheme();

  const router = useRouter();

  return (
    <Stack
      direction={"row"}
      sx={{
        alignItems: "center",
        mt: "1.3rem",
        justifyContent: "center",
        mb: "1.2rem",
        width: "100%",
        overflowX: "auto",
      }}
    >
      {apps?.map((target) => {
        console.log(
          "difference for focusing",
          target?.link,
          router?.asPath,
          router?.asPath?.includes(target?.link)
        );

        return (
          <Stack
            onClick={(event) => {
              event?.preventDefault();
              router.push(target?.link);
            }}
            direction={"column"}
            sx={{
              alignItems: "center",
              mx: "1.5vw",
              mt: ".3rem",
              minwidth: "50px",
              cursor: "pointer",
              justifyContent: "space-between",
            }}
          >
            {target?.icon({
              sx: {
                fontSize: "16px",
                width: "16px",
                color: router?.asPath?.includes(target?.link)
                  ? theme.palette.primary.main
                  : theme.palette.grey[500],
              },
            })}
            <Typography
              component={"span"}
              sx={{
                fontWeight: theme.typography.fontWeightMedium,
                color: router?.asPath?.includes(target?.link)
                  ? theme.palette.primary.main
                  : theme.palette.grey[500],
                fontSize: "11px",
                textAlign: "center",
              }}
            >
              {target?.title}
            </Typography>
          </Stack>
        );
      })}
    </Stack>
  );
};

export default MenuItems;
