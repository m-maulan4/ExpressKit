const { Sequelize } = require("sequelize");
const bcrypt = require("bcrypt");
const db = require("../db/config/db");
const Users = db.define(
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
  },
  {
    freezeTableName: true,
    hooks: {
      beforeCreate: async (user) => {
        const slat = await bcrypt.slat(10);
        user.password = await bcrypt.hash(user.password, slat);
      },
    },
  }
);
Users.sync();
module.exports = Users;
