// offer pricing controller definition

const {
  default: OfferManager,
} = require("../../../../src/helpers/OfferManager");
import logger from "../../../../src/utils/logger";

const requestHandler = async (req, res) => {
  let priceList = [];

  let groupKey = req?.query?.group;

  await OfferManager.getPriceList(groupKey)
    .then((results) => {
      priceList = results?.priceList;
    })
    .catch((error) => {
      logger.error(
        `an error has occured when trying to invoke offerManager getgroups list ${error}`
      );

      priceList = null;
    });

  if (priceList !== null) {
    res.status(200).json({
      code: 200,
      groups: priceList,
    });
  } else {
    res.status(400).json({
      code: 400,
      groups: priceList,
    });
  }
};

export default requestHandler;
