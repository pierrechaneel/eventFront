// Payment  controller definition

import Payment from "../../../src/api/models/Payments";

import { Op } from "sequelize";
import logger from "../../../src/utils/logger";

class PaymentController {
  static async getAll(req, res) {
    const startDate = req?.body?.startDate;
    const endDate = req?.body?.endDate;

    let Payments = [];

    await Payment.findAll({
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
        Payments = results;
      })
      .catch((error) => {
        logger.error(
          `an error has occured when trying to get all Payments by date ${error}`
        );
      });

    res?.status(200).json({
      Payments,
    });
  }

  static async updateOne(req, res) {
    const PaymentId = req?.query?.id;

    const PaymentObj = req?.body;

    let processed = false;

    await Payment.update(PaymentObj, {
      where: {
        id: PaymentId,
      },
    })
      .then((results) => {
        processed = true;
      })
      .catch((error) => {
        logger.error(
          `an error has occured when trying to update an Payment`,
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

    await Payment.destroy({})
      .then((results) => {
        processed = true;
      })
      .catch((error) => {
        logger.error(
          `an error has occured when destroying all Payments`,
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
    const newPayment = req?.body;

    let processed = false;

    await Payment.create(newPayment)
      .then((results) => {
        processed = true;
      })
      .catch((error) => {
        logger.error(
          `an error has occured when trying to create a new Payment ${error}`
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

export default PaymentController;
