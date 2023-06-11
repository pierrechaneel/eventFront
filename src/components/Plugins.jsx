// plugins component defition

import * as React from "react";
import {
  Avatar,
  Box,
  IconButton,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import Edit from "@mui/icons-material/Edit";
import MenuOpen from "@mui/icons-material/MenuOpen";
import ViewAgenda from "@mui/icons-material/ViewAgenda";
import { useRouter } from "next/router";
import Chat from "@mui/icons-material/Chat";
import Info from "@mui/icons-material/Info";
import LiveTv from "@mui/icons-material/LiveTv";
import MeetingRoom from "@mui/icons-material/MeetingRoom";
import Person from "@mui/icons-material/Person";
import QrCode from "@mui/icons-material/QrCode";
import QuestionAnswer from "@mui/icons-material/QuestionAnswer";
import People from "@mui/icons-material/People";
import { LangCtx } from "../../context/lang";

const Plugins = ({ collapsedPlugin, setCollapsedPlugin, handleEditSelf }) => {
  const theme = useTheme();

  const router = useRouter();

  const lang = React.useContext(LangCtx)?.lang;

  console.log("current language", { lang });

  const pluginsMaterials = [
    {
      title: lang === "fr" ? "Profil" : "Profile",
      link: `/guests/${router?.query?.guest}/profile`,
      icon: (props) => <Person {...props} />,
    },
    {
      title: "QR Code",
      link: `/guests/${router?.query?.guest}/qrcode`,
      icon: (props) => <QrCode {...props} />,
    },
    {
      title: "Agenda",
      link: `/guests/${router?.query?.guest}/agenda`,
      icon: (props) => <ViewAgenda {...props} />,
    },
    {
      title: "Contacts",
      link: `/guests/${router?.query?.guest}/contacts`,
      icon: (props) => <People {...props} />,
    },
    {
      title: "Informations",
      link: `/guests/${router?.query?.guest}/infos`,
      icon: (props) => <Info {...props} />,
    },
    {
      title: "Q&A",
      link: `/guests/${router?.query?.guest}/qa`,
      icon: (props) => <QuestionAnswer {...props} />,
    },
    {
      title: "Networking",
      link: `/guests/${router?.query?.guest}/chat`,
      icon: (props) => <Chat {...props} />,
    },
    {
      title: "Meeting",
      link: `/guests/${router?.query?.guest}/meeting`,
      icon: (props) => <MeetingRoom {...props} />,
    },
    {
      title: "Publications",
      link: `/guests/${router?.query?.guest}/meeting`,
      icon: (props) => <LiveTv {...props} />,
    },
  ];

  return (
    <Box
      sx={{
        width: "100%",
        height: "100vh",
      }}
    >
      <Stack
        direction={"column"}
        sx={{
          alignItems: "center",
          p: "1rem",
          backgroundImage: "url('/web_events_okapi.svg')",
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          height: "100vh",
          pt: "5vh",
          m: 0,
        }}
      >
        {!collapsedPlugin ? (
          <Stack
            direction={"row"}
            sx={{
              flexWrap: "wrap",
              justifyContent: "space-between",
            }}
          >
            {pluginsMaterials?.map((target, index) => {
              return (
                <Stack
                  key={index}
                  direction={"column"}
                  onClick={(event) => {
                    event?.preventDefault();

                    router.push(target?.link);
                  }}
                  sx={{
                    alignItems: "center",
                    bgcolor: theme.palette.common.black,
                    // flexGrow: 1,
                    width: "38%",
                    m: "1rem",
                    py: ".5rem",
                    px: "1rem",
                    cursor: "pointer",
                    justifySelf: "flex-start",
                    border: router?.asPath?.includes(target?.link)
                      ? `2px solid ${theme.palette.primary.main}`
                      : undefined,
                  }}
                >
                  {target?.icon({
                    sx: {
                      fontSize: "34px",
                      color: theme.palette.primary.main,
                    },
                  })}
                  <Typography
                    component={"span"}
                    sx={{
                      fontWeight: theme.typography.fontWeightBold,
                      color: theme.palette.common.white,
                      fontSize: "14px",
                      textAlign: "center",
                    }}
                  >
                    {target?.title}
                  </Typography>
                </Stack>
              );
            })}
          </Stack>
        ) : (
          ""
        )}
      </Stack>
    </Box>
  );
};

export default Plugins;
