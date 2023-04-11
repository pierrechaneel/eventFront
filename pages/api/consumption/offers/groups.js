// offer group controller definition

const {
  default: OfferManager,
} = require("../../../../src/helpers/OfferManager");
import logger from "../../../../src/utils/logger";

const requestHandler = async (req, res) => {
  let groupList = [];

  await OfferManager.getOfferGroups()
    .then((results) => {
      groupList = results;
    })
    .catch((error) => {
      logger.error(
        `an error has occured when trying to invoke offerManager getgroups list ${error}`
      );

      groupList = null;
    });

  if (groupList !== null) {
    res.status(200).json({
      code: 200,
      groups: groupList?.offerGroups,
    });
  } else {
    res.status(400).json({
      code: 400,
      groups: groupList?.offerGroups,
    });
  }
};

export default requestHandler;
