'use strict'

module.exports = (sequelize, DataTypes) => {
  var Game = sequelize.define('Game', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    fieldId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Field',
        key: 'id'
      }
    },
    gameResultId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'GameResult',
        key: 'id'
      }
    }
  }, {
    timestamps: true
  })
  return Game;
}
