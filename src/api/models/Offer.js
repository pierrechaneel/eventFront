//Model definition

import { DataTypes } from "sequelize";
import db from "../configs/db";

const Offer = db.define("Offer", {
  comName: {
    type: "VARCHAR(100)",
    required: true,
  },

  description: {
    type: "VARCHAR(100)",
    required: true,
  },
  price: {
    type: DataTypes?.FLOAT,
    required: true,
  },
  code1: {
    type: "VARCHAR(50)",
    required: true,
  },
  code2: {
    type: "VARCHAR(50)",
    required: true,
  },
  publishDate: {
    type: DataTypes.DATE,
    required: true,
  },
});

(async () => {
  await Offer.sync();
})();

export default Offer;
