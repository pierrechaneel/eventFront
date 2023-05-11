// controller definition

import axios from "axios";
import configs from "../../../configs/generals.json";
import logger from "../../../src/utils/logger";

const requestHandler = async (req, res) => {
  const updateBody = req?.body;

  let processed = false;

  await axios
    .put(`${configs?.backendUrl}/api/guests/properties`, updateBody)
    .then((res) => {
      processed = true;
    })
    .catch((error) => {
      logger.error(
        `an errorr has occured when trying to update guest profile ${error}`
      );
    });

  if (processed === true) {
    res.status(200).json({
      code: 200,
      message: "profile updated successfully",
    });
  } else {
    res.status(400).json({
      code: 400,
      message: "an error has occured",
    });
  }
};

export default requestHandler;
