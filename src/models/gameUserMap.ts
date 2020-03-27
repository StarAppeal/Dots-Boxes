'use strict'

module.exports = (sequelize, DataTypes) => {
  var GameUserMap = sequelize.define('GameUserMap', {
    gameId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: 'Games',
        key: 'id'
      }
    },
    userId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: 'User',
        key: 'id'
      }
    },
    active: DataTypes.BOOLEAN,
    userMetadataId: {
      type: DataTypes.INTEGER,
      references: {
        model: "UserMetadata",
        key: 'id'
      }
    }
  }, {
    freezeTableName: true
  });

  return GameUserMap;
}
