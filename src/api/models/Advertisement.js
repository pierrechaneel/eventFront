//Model definition

import { DataTypes } from "sequelize";
import db from "../configs/db";

const Advertisement = db.define("Advertisement", {
  title: {
    type: "VARCHAR(80)",
    required: true,
  },
  description: {
    type: "VARCHAR(300)",
    required: true,
  },
  imageLink: {
    type: "VARCHAR(70)",
    required: true,
  },
  ctaLink: {
    type: "VARCHAR(70)",
    required: true,
  },
});

(async () => {
  await Advertisement.sync();
})();

export default Advertisement;
