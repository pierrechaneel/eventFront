// Offer  controller definition

import Offer from "../../../src/api/models/Offer";

import { Op } from "sequelize";
import logger from "../../../src/utils/logger";

class OfferController {
  static async getAll(req, res) {
    const startDate = req?.body?.startDate;
    const endDate = req?.body?.endDate;

    let Offers = [];

    await Offer.findAll({
      where: {
        [Op.and]: [
          {
            createdAt: {
              [Op.gte]: startDate,
            },
          },
          {
            createdAt: {
              [Op.lte]: endDate,
            },
          },
        ],
      },
    })
      .then((results) => {
        Offers = results;
      })
      .catch((error) => {
        logger.error(
          `an error has occured when trying to get all Offers by date ${error}`
        );
      });

    res?.status(200).json({
      Offers,
    });
  }

  static async updateOne(req, res) {
    const OfferId = req?.query?.id;

    const OfferObj = req?.body;

    let processed = false;

    await Offer.update(OfferObj, {
      where: {
        id: OfferId,
      },
    })
      .then((results) => {
        processed = true;
      })
      .catch((error) => {
        logger.error(
          `an error has occured when trying to update an Offer`,
          error
        );
      });

    if (processed) {
      res.status(200).json({
        processed,
      });
    } else {
      res.status(400).json({
        processed,
      });
    }
  }

  static async deleteAll(req, res) {
    let processed = false;

    await Offer.destroy({})
      .then((results) => {
        processed = true;
      })
      .catch((error) => {
        logger.error(`an error has occured when destroying all Offers`, error);
      });

    if (processed) {
      res.status(200).json({
        processed,
      });
    } else {
      res.status(400).json({
        processed,
      });
    }
  }

  static async create(req, res) {
    const newOffer = req?.body;

    let processed = false;

    await Offer.create(newOffer)
      .then((results) => {
        processed = true;
      })
      .catch((error) => {
        logger.error(
          `an error has occured when trying to create a new Offer ${error}`
        );
      });

    if (processed) {
      res.status(200).json({
        processed,
      });
    } else {
      res.status(400).json({
        processed,
      });
    }
  }
}

export default OfferController;
