// Advertisement  controller definition

import Advertisement from "../../../src/api/models/Advertisement";

import { Op } from "sequelize";
import logger from "../../../src/utils/logger";

class AdvertisementController {
  static async getAll(req, res) {
    const startDate = req?.body?.startDate;
    const endDate = req?.body?.endDate;

    let Advertisements = [];

    await Advertisement.findAll({
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
        Advertisements = results;
      })
      .catch((error) => {
        logger.error(
          `an error has occured when trying to get all Advertisements by date ${error}`
        );
      });

    res?.status(200).json({
      Advertisements,
    });
  }

  static async updateOne(req, res) {
    const AdvertisementId = req?.query?.id;

    const AdvertisementObj = req?.body;

    let processed = false;

    await Advertisement.update(AdvertisementObj, {
      where: {
        id: AdvertisementId,
      },
    })
      .then((results) => {
        processed = true;
      })
      .catch((error) => {
        logger.error(
          `an error has occured when trying to update an Advertisement`,
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

    await Advertisement.destroy({})
      .then((results) => {
        processed = true;
      })
      .catch((error) => {
        logger.error(
          `an error has occured when destroying all Advertisements`,
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

  static async create(req, res) {
    const newAdvertisement = req?.body;

    let processed = false;

    await Advertisement.create(newAdvertisement)
      .then((results) => {
        processed = true;
      })
      .catch((error) => {
        logger.error(
          `an error has occured when trying to create a new Advertisement ${error}`
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

export default AdvertisementController;
