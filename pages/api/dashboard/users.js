// User  controller definition

import User from "../../../src/api/models/User";

import { Op } from "sequelize";
import logger from "../../../src/utils/logger";

class UserController {
  static async getAll(req, res) {
    const startDate = req?.body?.startDate;
    const endDate = req?.body?.endDate;

    let Users = [];

    await User.findAll({
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
        Users = results;
      })
      .catch((error) => {
        logger.error(
          `an error has occured when trying to get all Users by date ${error}`
        );
      });

    res?.status(200).json({
      Users,
    });
  }

  static async updateOne(req, res) {
    const UserId = req?.query?.id;

    const UserObj = req?.body;

    let processed = false;

    await User.update(UserObj, {
      where: {
        id: UserId,
      },
    })
      .then((results) => {
        processed = true;
      })
      .catch((error) => {
        logger.error(
          `an error has occured when trying to update an User`,
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

    await User.destroy({})
      .then((results) => {
        processed = true;
      })
      .catch((error) => {
        logger.error(`an error has occured when destroying all Users`, error);
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
    const newUser = req?.body;

    let processed = false;

    await User.create(newUser)
      .then((results) => {
        processed = true;
      })
      .catch((error) => {
        logger.error(
          `an error has occured when trying to create a new User ${error}`
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

export default UserController;
