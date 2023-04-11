//Model definition

import { DataTypes } from "sequelize";
import db from "../configs/db";

const Traffic = db.define("Traffic", {
  customerMsiddn: {
    type: "VARCHAR(100)",
    required: true,
  },
  date: {
    type: DataTypes.DATE,
    required: true,
  },
});

(async () => {
  await Traffic.sync();
})();

export default Traffic;
