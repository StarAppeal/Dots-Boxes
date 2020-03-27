'use strict'

module.exports = (sequelize, DataTypes) => {
  var UserMetadata = sequelize.define('UserMetadata', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'User',
        key: 'id'
      }
    },
    icon: DataTypes.STRING,
    color: DataTypes.STRING
  }, {
    freezeTableName: true,
    timestamps: false
  });

  return UserMetadata
}
