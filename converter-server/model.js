const { Sequelize, Op, Model, DataTypes } = require("sequelize");

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "db/first.db",
});

// https://sequelize.org

const Currency = sequelize.define(
  "Currency",
  {
    // Model attributes are defined here
    Date: {
      type: DataTypes.STRING,
    },
    ticker: {
      type: DataTypes.STRING(3),
    },
    rate: {
      type: DataTypes.FLOAT,
    },
  },
  {
    // Other model options go here
  }
);

const Name = sequelize.define(
  "Name",
  {
    ticker: {
      type: DataTypes.STRING(3),
    },
    LT: {
      type: DataTypes.STRING,
    },
    EU: {
      type: DataTypes.STRING,
    },
  },
  {
    // Other model options go here
  }
);

const Log = sequelize.define(
  "Log",
  {
    leftButton: {
      type: DataTypes.STRING(3),
    },
    rightButton: {
      type: DataTypes.STRING(3),
    },
    leftInput: {
      type: DataTypes.STRING,
    },
    rightInput: {
      type: DataTypes.STRING,
    },
  },
  {
    // Other model options go here
  }
);

exports.Currency = Currency;
exports.Name = Name;
exports.Log = Log;
exports.sequelize = sequelize;
