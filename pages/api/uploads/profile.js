// code deviananathon

import formidable from "formidable";
import fs from "fs";
import path from "path";
import logger from "../../../src/utils/logger";
import configs from "../../../configs/generals.json";

const handleFile = async (req, res) => {
  if (req?.method === "POST") {
    let form = new formidable.IncomingForm();
    let processed = false;
    let mediaPath = null;

    await form.parse(req, function (error, fields, files) {
      let oldPAth = files?.profile?.filepath;

      console.log("form files params", { files });

      let newPath =
        path.join(__dirname, "../../../../../", "public/profiles") +
        `/profile${Date.now()}-${files?.profile?.originalFilename}`;

      console.log("new media path str", { newPath });

      try {
        fs.copyFileSync(oldPAth, newPath);

        processed = true;
        mediaPath = newPath;

        logger?.info("new mediafile uploaded and moved!");

        res.status(200).json({
          code: 200,
          message: "media file created successfully",
          path: `${configs?.serviceUrl}/media/profiles/${mediaPath
            ?.split("/")
            .pop()}`,
        });
      } catch (error) {
        logger?.error("An error has occured when trying to get uploads", error);

        res?.status(400).json({
          code: 400,
          message: "couldn't add the indicated media file",
        });
      }
    });
  } else {
    res.status(404).json({
      code: 400,
      message: "Method not allowed",
    });
  }
};

export default handleFile;

export const config = {
  api: {
    bodyParser: false,
  },
};
