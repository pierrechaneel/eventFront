// components definition

import * as React from "react";
import { Stack, Typography, useTheme } from "@mui/material";
import { viewportsCtx } from "../../context/viewports";
import { LangCtx } from "../../context/lang";

const DownloadContacts = ({ contacts }) => {
  const theme = useTheme();

  const screen870 = React.useContext(viewportsCtx)?.screen870;
  const lang = React.useContext(LangCtx)?.lang;

  const handleDownloadContacts = (event) => {
    event?.preventDefault();

    let vcfContacts = ``;

    contacts?.forEach((contact) => {
      vcfContacts =
        vcfContacts +
        "\n" +
        `BEGIN:VCARD
VERSION:3.0
N;CHARSET=utf-8:${contact?.name?.split(" ")?.join(";")}
TITLE;CHARSET=utf-8:${contact?.title}
EMAIL;TYPE=INTERNET:${contact?.emailAdress}
END:VCARD\n`;
    });

    console.log("processing vcf result", vcfContacts);

    const file = new File([vcfContacts], "orange-rdc-contacts.vcf", {
      type: "text/plain",
    });

    const link = document.createElement("a");
    const url = URL.createObjectURL(file);

    link.href = url;
    link.download = file.name;
    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  return (
    <Stack
      onClick={handleDownloadContacts}
      sx={{
        width: "100%",
        borderRadius: screen870 ? "1rem" : "1.5rem",
        p: "1rem",
        bgcolor: "#FFFFFF10",
        cursor: "pointer",
        mb: "1.5rem",
        "&:hover": {
          "& p": {
            transition: "all .2s",
            color: theme.palette.common.white,
          },
        },
      }}
    >
      <Typography
        sx={{
          color: theme.palette.grey[500],
          fontWeight: theme.typography.fontWeightRegular,
          fontSize: screen870 ? "10px" : "10px",
          textAlign: "center",
          textTransform: "uppercase",
        }}
      >
        {lang === "fr"
          ? "Télécharger les contacts (Ouvrir le fichier après sur votre device pour le chargement)"
          : "Download all of the key contacts (Open the downloaded file on your device to charge them)"}
      </Typography>
    </Stack>
  );
};

export default DownloadContacts;
