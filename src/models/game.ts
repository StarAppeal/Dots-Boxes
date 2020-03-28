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
        model: 'Fields',
        key: 'id'
      }
    },
    gameResultId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'GameResults',
        key: 'id'
      }
    }
  }, {
    timestamps: true
  })
  return Game;
}
