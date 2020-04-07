'use strict'

module.exports = (sequelize, DataTypes) => {
  let Field = sequelize.define('Field', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    sheetId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Sheet',
        key: 'id'
      }
    }
  });
  return Field;
}
