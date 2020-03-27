'use strict'

module.exports = (sequelize, DataTypes) => {
  var GameResult = sequelize.define('GameResult', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    runtime: DataTypes.INTEGER,
    rounds: DataTypes.INTEGER
  });

  return GameResult;
}
