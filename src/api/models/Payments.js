//Model definition

import { DataTypes } from "sequelize";
import db from "../configs/db";

const Payment = db.define("P ayment", {
  creditedAccount: {
    type: "VARCHAR(20)",
    required: true,
  },

  beneficiary: {
    type: "VARCHAR(20)",
    required: true,
  },
  amount: {
    type: DataTypes?.FLOAT,
    required: true,
  },
  currency: {
    type: "VARCHAR(10)",
    required: true,
  },
  exchangeRate: {
    type: DataTypes?.FLOAT,
    required: true,
  },
});

(async () => {
  await Payment.sync();
})();

export default Payment;
