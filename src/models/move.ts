'use strict'

module.exports = (sequelize, DataTypes) => {
  let Move = sequelize.define('Move', {
    x: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    y: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    direction: {
      type: DataTypes.ENUM('top', 'bottom', 'left', 'right'),
      primaryKey: true
    },
    fieldId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: 'Field',
        key: 'id'
      }
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: "User",
        key: "id"
      }
    }
  });

  return Move;
}
