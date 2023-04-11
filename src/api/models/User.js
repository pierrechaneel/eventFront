//Model definition

import { DataTypes } from "sequelize";
import db from "../configs/db";

const User = db.define("User", {
  cuid: {
    type: "VARCHAR(10)",
    required: true,
  },

  email: {
    type: "VARCHAR(20)",
    required: true,
  },

  phoneNumber: {
    type: "VARCHAR(15)",
    required: true,
  },

  fullName: {
    type: "VARCHAR(30)",
    required: true,
  },

  role: {
    type: "VARCHAR(10)",
    required: true,
  },

  isActivate: {
    type: DataTypes.BOOLEAN,
    required: true,
    defaultValue: 0,
  },
});

(async () => {
  await User.sync();
})();

export default User;
