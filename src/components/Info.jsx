import * as React from "react";
import { Box, Stack, Typography, useTheme } from "@mui/material";
import { GuestCtx } from "../../context/guest";
import { LangCtx } from "../../context/lang";
import { ArrowRightAlt } from "@mui/icons-material";
import { viewportsCtx } from "../../context/viewports";

const Info = ({}) => {
  const theme = useTheme();

  const guest = React.useContext(GuestCtx).guest;

  const lang = React.useContext(LangCtx).lang;

  const screen870 = React.useContext(viewportsCtx)?.screen870;

  return (
    <Stack
      direction={"row"}
      sx={{
        width: "100%",
        p: 0,
        m: 0,
        height: "100%",
        maxHeight: "100%",
        flexGrow: 1,
        borderRadius: "1.5rem",
        overflowX: "hidden",
        overflowY: "auto",
        alignItems: "flex-start",
        justifyContent: "space-between",
        flexWrap: screen870 ? "wrap" : undefined,

        //bgcolor: theme.palette.common.black,
      }}
    >
      <Box
        sx={{
          height: "max-content",
          maxHeight: "max-content",
          width: screen870 ? "100%" : "70%",
          p: "2rem",
          bgcolor: theme.palette.common.black,
          overflowX: "hidden",
          borderRadius: "1.5rem",
          mr: screen870 ? undefined : "1.5rem",
        }}
      >
        <Stack
          sx={{
            width: "100%",
            bgcolor: "#FFFFFF10",
            overflowX: "hidden",
            height: "max-content",
            maxHeight: "max-content",
            borderRadius: "1.5rem",
            p: "1.5rem",
          }}
        >
          <Typography
            sx={{
              color: theme.palette.common.white,
              fontWeight: theme.typography.fontWeightBold,
              fontSize: "14px",
              mb: "1rem",
            }}
          >
            Mot du Directeur Général
          </Typography>
          <Typography
            sx={{
              color: theme.palette.common.white,
              fontWeight: theme.typography.fontWeightLight,
              fontSize: "12px",
            }}
          >
            Cher{" "}
            <Typography
              component={"span"}
              sx={{
                color: theme.palette.primary.main,
                fontWeight: theme.typography.fontWeightRegular,
                fontSize: "12px",
              }}
            >
              {guest?.fullName}
            </Typography>
            , Je te souhaite la bienvenue en République Démocratique du Congo,
            un grand pays avec d’immenses ressources économiques. La République
            Démocratique du Congo est au centre du continent africain et se
            subdivise en 26 Provinces issues de la profonde réforme de
            l’organisation politique, administrative et territoriale. Elle est
            entourée de 9 pays frontaliers : République du Congo, République
            Centrafricaine, Sud-Soudan, Ouganda, Rwanda, Burundi, Tanzanie,
            Zambie et Angola. Au nom du{" "}
            <Typography
              component={"span"}
              sx={{
                color: theme.palette.primary.main,
                fontWeight: theme.typography.fontWeightRegular,
                fontSize: "12px",
              }}
            >
              Comité de Direction d’Orange RDC
            </Typography>{" "}
            et de tous les{" "}
            <Typography
              component={"span"}
              sx={{
                color: theme.palette.primary.main,
                fontWeight: theme.typography.fontWeightRegular,
                fontSize: "12px",
              }}
            >
              collègues
            </Typography>{" "}
            , je vous souhaite, à toi et ta délégation, la bienvenue à Kinshasa,
            capitale de la République Démocratique du Congo. A toutes fins
            utiles, le Responsable de la Sécurité physique se tient à votre
            disposition pour toute question liée à votre sécurité durant votre
            visite chez{" "}
            <Typography
              component={"span"}
              sx={{
                color: theme.palette.primary.main,
                fontWeight: theme.typography.fontWeightRegular,
                fontSize: "12px",
              }}
            >
              Orange RDC
            </Typography>{" "}
            .
          </Typography>
          <Typography
            sx={{
              color: theme.palette.common.white,
              textAlign: "right",
              fontWeight: theme.typography.fontWeightBold,
              fontSize: "14px",
            }}
          >
            Ben Cheick HAIDARA
          </Typography>
          <Typography
            sx={{
              color: theme.palette.common.white,
              textAlign: "right",
              fontWeight: theme.typography.fontWeightLight,
              fontSize: "12px",
            }}
          >
            Directeur Général
          </Typography>
        </Stack>
      </Box>
      <Stack
        sx={{
          width: screen870 ? "100" : "30%",
          height: "100%",
          bgcolor: theme.palette.common.black,
          borderRadius: "1.5rem",
          overflow: "hidden",
          mt: screen870 ? "1.5rem" : undefined,
        }}
      >
        <img
          src="/kinCity.png"
          alt="Kin the best"
          style={{
            width: "100%",
            height: "max-content",
          }}
        />

        <Stack
          direction={"column"}
          sx={{
            alignItems: "center",
            p: "1rem",
            overflowX: "hidden",
            flexGrow: 1,
            height: "max-content",
            maxHeight: "100%",
            overflowY: "auto",
          }}
        >
          <Stack
            direction={"column"}
            sx={{
              alignItems: "flex-start",
              p: ".5rem",
              borderRadius: "1rem",
              // overflow: "hidden",
              width: "100%",
              bgcolor: "#FFFFFF10",
              m: ".5rem",
              height: "max-content",
            }}
          >
            <Typography
              sx={{
                color: theme.palette.common.white,
                fontWeight: theme.typography.fontWeightRegular,
                fontSize: "12px",
              }}
            >
              A l'arrivée
            </Typography>
            <Typography
              sx={{
                color: theme.palette.common.white,
                fontWeight: theme.typography.fontWeightThin,
                fontSize: "10px",
              }}
            >
              Vous serez pris en charge à l’aéroport par le protocole ORDC. En
              cas de problème, contactez les personnes en charge de la sécurité
              (Responsable de la Sécurité, Protocole ou Assistante du Directeur
              Général).
            </Typography>
          </Stack>
          <Stack
            direction={"column"}
            sx={{
              alignItems: "flex-start",
              p: ".5rem",
              borderRadius: "1rem",
              //overflow: "hidden",
              width: "100%",
              bgcolor: "#FFFFFF10",
              m: ".5rem",
              height: "max-content",
            }}
          >
            <Typography
              sx={{
                color: theme.palette.common.white,
                fontWeight: theme.typography.fontWeightRegular,
                fontSize: "12px",
              }}
            >
              Vos déplacements
            </Typography>
            <Stack>
              {[
                "Ne prenez jamais de taxi. Des véhicules seront mis à votre disposition",
                "Portez votre ceinture de sécurité en voiture et verrouillez vos portières",
                "Ne vous déplacez jamais seul(e) mais accompagné(e) d’un chauffeur ou d’un collaborateur de Orange RDC",
                "Pour tout trajet vers un site non RDC, informez le Responsable de la Sécurité ou le DG ORDC",
                "Mémorisez les adresses clés (hébergement, siège de la société, Ambassade de France, etc.) ",
                "Ayez toujours sur vous une copie de vos documents d’identité (passeport muni du visa, billet d’avion, etc.) et ayez une copie électronique de votre passeport sur votre smartphone",
                "Ayez toujours avec vous vos médicaments",
              ]?.map((target) => {
                return (
                  <Stack
                    direction={"row"}
                    sx={{
                      alignItems: "flex-start",
                      justifyContent: "flex-start",
                      my: ".5rem",
                    }}
                  >
                    <ArrowRightAlt
                      sx={{
                        color: theme.palette.common.white,
                      }}
                    />
                    <Typography
                      sx={{
                        color: theme.palette.common.white,
                        fontWeight: theme.typography.fontWeightThin,
                        fontSize: "10px",
                      }}
                    >
                      {target}
                    </Typography>
                  </Stack>
                );
              })}
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default Info;
