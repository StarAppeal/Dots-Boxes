'use strict';

module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
	id:{
	type: DataTypes.INTEGER,
	primaryKey: true,
	autoIncrement: true
	},
	username: DataTypes.STRING,
	email: DataTypes.STRING,
	pass: DataTypes.STRING
  });

  //associations here:


  return User;
};
