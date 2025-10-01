import { Sequelize } from "sequelize";
import bcrypt from "bcrypt";
import { db } from "../db/config/db.js";
export const userModel = db.define(
  "Users",
  {
    fullname: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    username: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    refresh_token: {
      type: Sequelize.STRING,
    },
  },
  {
    freezeTableName: true,
    hooks: {
      beforeCreate: async (user) => {
        const slat = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, slat);
      },
    },
  }
);
userModel.sync();
