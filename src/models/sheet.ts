'use strict'

module.exports = (sequelize, DataTypes) => {
  var Sheet = sequelize.define('Sheet', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'User',
        key: 'id'
      }
    },
    archived: DataTypes.BOOLEAN
  });

  return Sheet;
}
