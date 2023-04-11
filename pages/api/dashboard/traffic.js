// Traffic  controller definition

import Traffic from "../../../src/api/models/Traffic";

import { Op } from "sequelize";
import logger from "../../../src/utils/logger";

class TrafficController {
  static async getAll(req, res) {
    const startDate = req?.body?.startDate;
    const endDate = req?.body?.endDate;

    let Traffics = [];

    await Traffic.findAll({
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
        Traffics = results;
      })
      .catch((error) => {
        logger.error(
          `an error has occured when trying to get all Traffics by date ${error}`
        );
      });

    res?.status(200).json({
      Traffics,
    });
  }

  static async updateOne(req, res) {
    const TrafficId = req?.query?.id;

    const TrafficObj = req?.body;

    let processed = false;

    await Traffic.update(TrafficObj, {
      where: {
        id: TrafficId,
      },
    })
      .then((results) => {
        processed = true;
      })
      .catch((error) => {
        logger.error(
          `an error has occured when trying to update an Traffic`,
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

    await Traffic.destroy({})
      .then((results) => {
        processed = true;
      })
      .catch((error) => {
        logger.error(
          `an error has occured when destroying all Traffics`,
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
    const newTraffic = req?.body;

    let processed = false;

    await Traffic.create(newTraffic)
      .then((results) => {
        processed = true;
      })
      .catch((error) => {
        logger.error(
          `an error has occured when trying to create a new Traffic ${error}`
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

export default TrafficController;
