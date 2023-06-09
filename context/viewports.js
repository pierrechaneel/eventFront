// Socket context definition

import * as React from "react";
import { subsSocket } from "../services/sockets";
import {
  Box,
  CssBaseline,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import BottomSwippeable from "../src/components/BottomSwippeable";
import { useRouter } from "next/router";
import {
  Home,
  Info,
  LiveTv,
  People,
  Person,
  PostAdd,
  QrCode,
  ViewAgenda,
} from "@mui/icons-material";
import { Global } from "@emotion/react";
import MenuItems from "../src/components/MenuItems";
import { LangCtx } from "./lang";
import { GuestCtx } from "./guest";

const viewportsCtx = React.createContext({});

const ViewportsContext = ({ children }) => {
  const theme = useTheme();

  const screen870 = useMediaQuery(theme.breakpoints.down(870));

  const screen660 = useMediaQuery(theme.breakpoints.down(660));

  const router = useRouter();

  let guestObj = React?.useContext(GuestCtx)?.guest;

  const lang = React.useContext(LangCtx)?.lang;

  const [apps, setApps] = React.useState([
    {
      title: lang === "fr" ? "Acceuil" : "Home",
      link: `/guests/${guestObj?.accessKey}/qrcode`,
      icon: (props) => <Home {...props} />,
    },
    {
      title: lang === "fr" ? "Profil" : "Profile",
      link: `/guests/${guestObj?.accessKey}/profile`,
      icon: (props) => <Person {...props} />,
    },
    {
      title: "Agenda",
      link: `/guests/${guestObj?.accessKey}/agenda`,
      icon: (props) => <ViewAgenda {...props} />,
    },
    {
      title: "Contacts",
      link: `/guests/${guestObj?.accessKey}/contacts`,
      icon: (props) => <People {...props} />,
    },
    {
      title: "Informations",
      link: `/guests/${guestObj?.accessKey}/infos`,
      icon: (props) => <Info {...props} />,
    },
    {
      title: "Live",
      link: `/guests/${guestObj?.accessKey}/meeting`,
      icon: (props) => <LiveTv {...props} />,
    },
    {
      title: "Networking",
      link: `/guests/${guestObj?.accessKey}/social-wall`,
      icon: (props) => <PostAdd {...props} />,
    },
  ]);

  // console.log("current language", { lang });
  React.useEffect(() => {
    let guestObj = JSON.parse(window.sessionStorage.getItem("guest"));

    if (guestObj) {
      const menuApps = [
        {
          title: lang === "fr" ? "Acceuil" : "Home",
          link: `/guests/${guestObj?.accessKey}/qrcode`,
          icon: (props) => <Home {...props} />,
        },
        {
          title: lang === "fr" ? "Profil" : "Profile",
          link: `/guests/${guestObj?.accessKey}/profile`,
          icon: (props) => <Person {...props} />,
        },
        {
          title: "Agenda",
          link: `/guests/${guestObj?.accessKey}/agenda`,
          icon: (props) => <ViewAgenda {...props} />,
        },
        {
          title: "Contacts",
          link: `/guests/${guestObj?.accessKey}/contacts`,
          icon: (props) => <People {...props} />,
        },
        {
          title: "Informations",
          link: `/guests/${guestObj?.accessKey}/infos`,
          icon: (props) => <Info {...props} />,
        },
        {
          title: "Live",
          link: `/guests/${guestObj?.accessKey}/meeting`,
          icon: (props) => <LiveTv {...props} />,
        },
        {
          title: "Networking",
          link: `/guests/${guestObj?.accessKey}/social-wall`,
          icon: (props) => <PostAdd {...props} />,
        },
      ];

      console.log("menu processed apps list", menuApps);

      setApps(menuApps);
    }
  }, [lang]);

  const [isMenuCollapsed, setIsMenuCollapsed] = React.useState(false);
  const [isSwippeableVisible, setIsSwippeableVisible] = React.useState(false);

  const [defaultSwippeableContent, setDefaultSwippeableContent] =
    React.useState(<MenuItems apps={apps} />);

  const drawerBleeding = 56;

  return (
    <viewportsCtx.Provider
      value={{
        screen870,
        screen660,
        apps,
        isMenuCollapsed,
        setIsMenuCollapsed,
        isSwippeableVisible,
        setIsSwippeableVisible,
        setDefaultSwippeableContent,
      }}
    >
      {children}
      {screen660 ? (
        <Box sx={{}}>
          <CssBaseline />
          <Global
            styles={{
              ".MuiDrawer-root > .MuiPaper-root": {
                height: `max-content!important`,
                maxHeight: "80vh!important",
                overflowY: "auto!important",
                backgroundColor: theme.palette.common.black,
                minHeight: "50px",
              },
            }}
          />
          <BottomSwippeable
            defaultSwippeableContent={defaultSwippeableContent}
            apps={apps}
            open={isSwippeableVisible}
            setOpen={setIsSwippeableVisible}
            sx={{
              bgcolor: theme.palette.common.black,
            }}
          />
        </Box>
      ) : (
        ""
      )}
    </viewportsCtx.Provider>
  );
};

export { viewportsCtx };
export default ViewportsContext;
